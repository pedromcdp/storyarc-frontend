import {
  ClockIcon,
  TrendingUpIcon,
  CalendarIcon,
  HashtagIcon,
} from '@heroicons/react/outline';

export const feedFilters = [
  {
    name: 'Recentes',
    value: '/recent',
    icon: HashtagIcon,
  },
  {
    name: 'Em alta',
    value: '/trending',
    icon: TrendingUpIcon,
  },
  {
    name: 'Por ano',
    value: '/per-year',
    icon: CalendarIcon,
  },
  {
    name: 'Em década',
    value: '/per-decade',
    icon: ClockIcon,
  },
];
