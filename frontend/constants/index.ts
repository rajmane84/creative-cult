import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Calendar,
  Users,
  Star,
  Settings,
  User,
} from 'lucide-react';

export const ROLE_ROUTES: Record<string, string> = {
  CLIENT: '/dashboard/client',
  CREATIVE: '/dashboard/creative',
  ADMIN: '/dashboard/admin',
};

export const DASHBOARD_NAVIGATION = {
  CREATIVE: [
    {
      href: '/dashboard/creative',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/creative/profile',
      label: 'Profile',
      icon: User,
    },
    {
      href: '/dashboard/creative/projects',
      label: 'Projects',
      icon: Briefcase,
    },
    {
      href: '/dashboard/creative/proposals',
      label: 'Proposals',
      icon: FileText,
    },
    {
      href: '/dashboard/creative/calendar',
      label: 'Calendar',
      icon: Calendar,
    },
  ],

  CLIENT: [
    {
      href: '/dashboard/client',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/client/profile',
      label: 'Profile',
      icon: User,
    },
    {
      href: '/dashboard/client/browse',
      label: 'Browse Creatives',
      icon: Users,
    },
    {
      href: '/dashboard/client/projects',
      label: 'Active Projects',
      icon: Briefcase,
    },
    {
      href: '/dashboard/client/saved',
      label: 'Saved',
      icon: Star,
    },
  ],

  ADMIN: [
    {
      href: '/dashboard/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/admin/profile',
      label: 'Profile',
      icon: User,
    },
    {
      href: '/dashboard/admin/users',
      label: 'Users',
      icon: Users,
    },
    {
      href: '/dashboard/admin/projects',
      label: 'Projects',
      icon: Briefcase,
    },
    {
      href: '/dashboard/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
  ],
} as const;
