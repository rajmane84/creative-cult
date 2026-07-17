'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOutButton } from '@/components/auth/sign-out-button';
import {
  User as UserIcon,
  LogOut,
  Briefcase,
  Users,
  Settings,
  LayoutDashboard,
  FileText,
  Calendar,
  Star,
} from 'lucide-react';
import type { User } from '@/types';

interface NavbarClientProps {
  user: User | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getNavLinks = () => {
    if (!user || !user.role) return [];

    switch (user.role) {
      case 'CREATIVE':
        return [
          {
            href: '/dashboard/creative',
            label: 'Dashboard',
            icon: LayoutDashboard,
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
        ];
      case 'CLIENT':
        return [
          {
            href: '/dashboard/client',
            label: 'Dashboard',
            icon: LayoutDashboard,
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
          { href: '/dashboard/client/saved', label: 'Saved', icon: Star },
        ];
      case 'ADMIN':
        return [
          {
            href: '/dashboard/admin',
            label: 'Dashboard',
            icon: LayoutDashboard,
          },
          { href: '/dashboard/admin/users', label: 'Users', icon: Users },
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
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="h-16 border-b border-border/50 bg-background/80 dark:bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            {user && user.role ? (
              <Link
                href={`/dashboard/${user.role.toLowerCase()}`}
                className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
              >
                Creative Cult
              </Link>
            ) : (
              <Link
                href="/"
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-200"
              >
                Creative Cult
              </Link>
            )}

            {/* Desktop Navigation */}
            {user && navLinks.length > 0 && (
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-medium
                        transition-all duration-200
                        ${
                          isActive(link.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 group">
            {user ? (
              <>
                {/* User Info */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                  <UserIcon className="w-4 h-4" />
                  <span className="font-medium">{user.name}</span>
                </div>

                {/* Sign Out Button */}
                <SignOutButton variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </SignOutButton>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
