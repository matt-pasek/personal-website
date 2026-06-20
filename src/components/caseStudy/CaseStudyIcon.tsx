import {
  Users,
  Check,
  Grid2X2,
  Star,
  Search,
  Palette,
  Rocket,
  User,
  Calendar,
  Layers,
  Target,
  ArrowRight,
  Clock,
} from 'lucide-react';
import type { ComponentProps } from 'react';

type IconName =
  | 'users'
  | 'check'
  | 'grid'
  | 'star'
  | 'search'
  | 'palette'
  | 'rocket'
  | 'user'
  | 'calendar'
  | 'layers'
  | 'target'
  | 'arrow-right'
  | 'clock';

interface Props extends ComponentProps<'svg'> {
  name: IconName;
  size?: number;
}

const MAP = {
  users: Users,
  check: Check,
  grid: Grid2X2,
  star: Star,
  search: Search,
  palette: Palette,
  rocket: Rocket,
  user: User,
  calendar: Calendar,
  layers: Layers,
  target: Target,
  'arrow-right': ArrowRight,
  clock: Clock,
} as const;

export function CaseStudyIcon({ name, size = 16, ...props }: Props) {
  const Icon = MAP[name];
  return <Icon size={size} strokeWidth={1.5} {...props} />;
}
