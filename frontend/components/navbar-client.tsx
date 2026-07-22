'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSignOut } from '@/hooks/auth/use-sign-out';
import {
  LayoutDashboard,
  User as UserIcon,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import type { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/cn';
import { DASHBOARD_NAVIGATION } from '@/constants';

interface NavbarClientProps {
  user: User | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const handleSignOut = useSignOut();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => pathname === path;

  const getProfileHref = () => {
    if (!user || !user.role) return '/profile';
    return `/dashboard/${user.role.toLowerCase()}/profile`;
  };

  const getNavLinks = () => {
    if (!user || !user.role) return [];
    return (
      DASHBOARD_NAVIGATION[user.role as keyof typeof DASHBOARD_NAVIGATION] || []
    );
  };

  const navLinks = getNavLinks();
  const profileHref = getProfileHref();

  const getUserInitials = () => {
    if (!user) return 'U';
    if (user.name) {
      const parts = user.name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return user.name.slice(0, 2).toUpperCase();
    }
    if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3">
        {/* Logo Section */}
        {user && user.role ? (
          <Link
            href={`/dashboard/${user.role.toLowerCase()}`}
            className="font-editorial font-bold text-base md:text-lg lg:text-xl tracking-tight flex items-center shrink-0 min-h-[44px]"
          >
            cre8ive
            <span className="text-primary selection:text-background selection:bg-primary">
              -
            </span>
            cult
            <span className="ml-1 font-mono text-[9px] md:text-[10px] align-super opacity-60">
              ™
            </span>
          </Link>
        ) : (
          <Link
            href="/"
            className="font-editorial font-bold text-base md:text-lg lg:text-xl tracking-tight flex items-center shrink-0 min-h-[44px]"
          >
            cre8ive
            <span className="text-primary selection:text-background selection:bg-primary">
              -
            </span>
            cult
            <span className="ml-1 font-mono text-[9px] md:text-[10px] align-super opacity-60">
              ™
            </span>
          </Link>
        )}

        {/* Desktop / Tablet Navigation (768px+) */}
        {user && navLinks.length > 0 && (
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 font-mono text-[10px] lg:text-[11px] uppercase tracking-wider"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group flex items-center gap-1.5 py-1.5 px-1.5 transition-colors duration-200 min-h-10',
                    active
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-3.5 h-3.5 shrink-0 transition-transform',
                      active &&
                        'text-primary selection:text-background selection:bg-primary'
                    )}
                  />
                  <span className="relative whitespace-nowrap">
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-primary selection:text-background selection:bg-primary transition-all duration-300 ease-out',
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section - User Controls & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 shrink-0">
          {user ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleSignOut}
              title="Sign Out"
              className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] lg:text-[11px] uppercase tracking-wider h-8 lg:h-9 px-3 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span>Sign Out</span>
            </Button>
          ) : (
            <div className="hidden md:flex items-center gap-2 lg:gap-3 font-mono text-[10px] lg:text-[11px] uppercase tracking-wider">
              <Link
                href="/login"
                className="px-2.5 py-1.5 opacity-70 hover:opacity-100 transition-opacity min-h-[40px] flex items-center"
              >
                Sign in
              </Link>
              <Button variant="default" size="sm" className="h-8 lg:h-9 px-3">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle Button (< 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center justify-center p-2 text-foreground hover:bg-accent border border-border transition-colors min-h-[40px] min-w-[40px]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-primary selection:text-background selection:bg-primary" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[65px] bottom-0 bg-background/98 backdrop-blur-xl border-b border-border z-40 md:hidden flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ height: 'calc(100vh - 65px)' }}
        >
          <div className="p-6 space-y-6">
            {/* User Profile Card in Mobile Menu */}
            {user ? (
              <div className="p-4 border border-border bg-card/60 rounded-none space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar size="default" className="border border-border">
                      {user.image && (
                        <AvatarImage
                          src={user.image}
                          alt={user.name || 'User profile'}
                        />
                      )}
                      <AvatarFallback className="font-mono text-xs font-bold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-editorial font-bold text-base leading-tight">
                        {user.name || 'User'}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground truncate max-w-[200px]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  {user.role && (
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 selection:text-background selection:bg-primary">
                      {user.role}
                    </span>
                  )}
                </div>

                <Link
                  href={profileHref}
                  className="flex items-center justify-between w-full px-3 py-2.5 bg-background border border-border hover:border-primary font-mono text-xs uppercase tracking-wider text-foreground transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
                    <span>View Full Profile</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>
            ) : null}

            {/* Mobile Nav Links */}
            <nav aria-label="Mobile Navigation" className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pb-2 px-1 border-b border-border/50">
                Navigation
              </div>

              {user && navLinks.length > 0 ? (
                <div className="pt-2 space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between px-4 py-3.5 font-mono text-xs uppercase tracking-wider border transition-all min-h-[48px]',
                          active
                            ? 'bg-primary/10 border-primary text-foreground font-bold'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/40'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={cn(
                              'w-4 h-4',
                              active
                                ? 'text-primary selection:text-background selection:bg-primary'
                                : 'text-muted-foreground'
                            )}
                          />
                          <span>{link.label}</span>
                        </div>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary selection:text-background selection:bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="pt-2 space-y-2">
                  <Link
                    href="/"
                    className={cn(
                      'flex items-center gap-3 px-4 py-3.5 font-mono text-xs uppercase tracking-wider border min-h-[48px]',
                      pathname === '/'
                        ? 'bg-primary/10 border-primary text-foreground'
                        : 'text-muted-foreground hover:bg-accent/40'
                    )}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>

          {/* Footer Actions in Mobile Drawer */}
          <div className="p-6 border-t border-border bg-card/30 space-y-3">
            {user ? (
              <Button
                variant="destructive"
                size="lg"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider min-h-12"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-h-12 font-mono text-xs uppercase"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="min-h-12 font-mono text-xs uppercase"
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
