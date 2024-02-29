import { LoadableState } from '@/types';
import {
  Ban,
  Check,
  Loader2,
  LucideProps,
  type LucideIcon
} from 'lucide-react';

const defaultIconMapping: Record<LoadableState, LucideIcon> = {
  loading: Loader2,
  loaded: Check,
  error: Ban
};

export interface LoadableIconProps extends LucideProps {
  fallback: LucideIcon;
  iconMapping?: typeof defaultIconMapping;
  state?: LoadableState | null;
}

export function LoadableIcon(props: LoadableIconProps) {
  const { state, iconMapping: iconMappingProp, fallback, ...other } = props;
  const iconMapping = { ...defaultIconMapping, ...iconMappingProp };
  const Icon = state ? iconMapping[state] : fallback;
  return <Icon {...other} />;
}
