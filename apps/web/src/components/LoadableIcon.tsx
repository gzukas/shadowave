import {
  Ban,
  Check,
  LoaderCircle,
  LucideProps,
  type LucideIcon
} from 'lucide-react';
import { LoadableState } from '@/types';

const defaultIconMapping: Record<LoadableState, LucideIcon> = {
  loading: LoaderCircle,
  hasData: Check,
  hasError: Ban
};

export interface LoadableIconProps extends LucideProps {
  /**
   * Icon to render when `state` is falsy.
   */
  fallback: LucideIcon;

  /**
   * Custom mapping of states to icons, overrides the default mapping.
   */
  iconMapping?: Partial<typeof defaultIconMapping>;

  /**
   * Current loading state that determines which icon to display.
   */
  state?: LoadableState | null;
}

/**
 * A component that dynamically renders different icons based on a loading state.
 */
export function LoadableIcon(props: LoadableIconProps) {
  const { state, iconMapping: iconMappingProp, fallback, ...other } = props;
  const iconMapping = { ...defaultIconMapping, ...iconMappingProp };
  const Icon = state ? iconMapping[state] : fallback;
  return <Icon {...other} />;
}
