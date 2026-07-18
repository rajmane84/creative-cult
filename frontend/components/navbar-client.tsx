'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSignOut } from '@/hooks/auth/use-sign-out';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  const handleSignOut = useSignOut();

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
    <nav className="h-16 border-b border-border/40 bg-background/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-10">
            {user && user.role ? (
              <Link
                href={`/dashboard/${user.role.toLowerCase()}`}
                className="text-[17px] font-semibold tracking-tight text-foreground transition-colors duration-200 flex items-center gap-2"
              >
                Creative Cult
              </Link>
            ) : (
              <Link
                href="/"
                className="text-[17px] font-semibold tracking-tight text-foreground transition-colors duration-200 flex items-center gap-2"
              >
                Creative Cult
              </Link>
            )}

            {/* Desktop Navigation */}
            {user && navLinks.length > 0 && (
              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        group flex items-center gap-2 py-1 text-[13px] font-medium
                        transition-colors duration-200
                        ${
                          active
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 transition-colors duration-200 ${active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                      />
                      <span className="relative">
                        {link.label}
                        <span
                          className={`absolute bottom-[-6px] left-0 h-[1.5px] bg-foreground transition-all duration-300 ease-out rounded-full ${
                            active ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Info */}
                <div className="hidden sm:flex items-center gap-2.5 px-1 py-1 rounded-full">
                  <Avatar size="sm" className="border border-border/50">
                    <AvatarImage
                      src={user.image || ''}
                      alt={user.name || 'User avatar'}
                    />
                    <AvatarFallback>
                      <UserIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[13px] font-medium text-foreground">
                    {user.name}
                  </span>
                </div>

                <div className="w-px h-4 bg-border/60 mx-1 hidden sm:block" />

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="group flex items-center h-8 px-3 rounded-md text-[13px] text-muted-foreground hover:text-destructive transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive/30 cursor-pointer"
                  aria-label="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5 sm:mr-2 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-destructive" />
                  <span className="hidden sm:inline font-medium group-hover:text-destructive transition-colors duration-200">
                    Sign out
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="text-[13px] font-medium bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200 hover:shadow-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
