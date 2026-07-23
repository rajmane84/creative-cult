'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const PATH_NAME_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  creative: 'Creative',
  profile: 'Profile',
  projects: 'Projects',
  proposals: 'Proposals',
  calendar: 'Calendar',
  settings: 'Settings',
};

export function CreativeDashboardBreadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const isRootDashboard =
    pathname === '/dashboard/creative' || pathname === '/dashboard/creative/';

  return (
    <div className="w-full border-b border-border bg-card/40 px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Root item */}
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href="/dashboard/creative" />}
                className="flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-primary selection:text-background selection:bg-primary" />
                <span>Creative</span>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {isRootDashboard ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <span>Overview</span>
                    <span className="w-1.5 h-1.5 bg-primary selection:text-background selection:bg-primary inline-block ml-1" />
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              segments.slice(2).map((segment, index, array) => {
                const isLast = index === array.length - 1;
                const href = `/dashboard/creative/${array
                  .slice(0, index + 1)
                  .join('/')}`;
                const label =
                  PATH_NAME_MAP[segment.toLowerCase()] ||
                  segment.replace(/-/g, ' ');

                return (
                  <div key={href} className="inline-flex items-center gap-1.5">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>
                          <span className="capitalize">{label}</span>
                          <span className="w-1.5 h-1.5 bg-primary selection:text-background selection:bg-primary inline-block ml-1" />
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          render={<Link href={href} />}
                          className="capitalize"
                        >
                          {label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                );
              })
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 selection:text-background selection:bg-primary font-semibold">
            Creative Portal
          </span>
        </div>
      </div>
    </div>
  );
}
