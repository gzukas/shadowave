import { unstable_withStorageValidator } from 'jotai/utils';
import { TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

/**
 * Creates a storage validator using a Typebox `schema` for use with Jotai's `atomWithStorage`.
 * 
 * Validates stored data against the provided `schema`, ensuring data consistency by falling 
 * back to the initial value if the stored data is invalid. This helps prevent application 
 * errors when schema changes occur.
 *
 * @param schema - The Typebox schema used for validation.
 *
 * @example
 * ```
 * const UserSchema = Type.Object({
 *   name: Type.Optional(Type.String()),
 *   age: Type.Optional(Type.Number())
 * });

 * const userAtom = atomWithStorage(
 *   'user',
 *   {},
 *   withStorageValidator(UserSchema)(createJSONStorage())
 * );
 * ```
 */
export function withStorageValidator<S extends TSchema>(schema: S) {
  return unstable_withStorageValidator(value => Value.Check(schema, value));
}
