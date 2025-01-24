import { Type } from '@sinclair/typebox';

export const url = Type.String({ pattern: '^https?://' });

export const deviceType = Type.Union([
  Type.Literal('desktop'),
  Type.Literal('tablet'),
  Type.Literal('mobile')
]);
