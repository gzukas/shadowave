import {
  Ban,
  Check,
  Loader2,
  LucideProps,
  type LucideIcon
} from 'lucide-react';
import { LoadableState } from '@/types';

const defaultIconMapping: Record<LoadableState, LucideIcon> = {
  loading: Loader2,
  hasData: Check,
  hasError: Ban
};

export interface LoadableIconProps extends LucideProps {
  fallback: LucideIcon;
  iconMapping?: Partial<typeof defaultIconMapping>;
  state?: LoadableState | null;
}

export function LoadableIcon(props: LoadableIconProps) {
  const { state, iconMapping: iconMappingProp, fallback, ...other } = props;
  const iconMapping = { ...defaultIconMapping, ...iconMappingProp };
  const Icon = state ? iconMapping[state] : fallback;
  return <Icon {...other} />;
}
