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
  client: 'Client',
  listings: 'Listings',
  new: 'Create',
  applications: 'Applications',
  saved: 'Saved Creatives',
  messages: 'Messages',
  invoices: 'Invoices',
  profile: 'Company Profile',
  settings: 'Settings',
};

export function DashboardBreadcrumbs() {
  const pathname = usePathname();

  // Break pathname into non-empty segments
  const segments = pathname.split('/').filter(Boolean);

  // Check if we are at /dashboard/client
  const isRootDashboard =
    pathname === '/dashboard/client' || pathname === '/dashboard/client/';

  return (
    <div className="w-full border-b border-border bg-card/40 px-4 sm:px-6 lg:px-8 py-3 h-11.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Root item */}
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href="/dashboard/client" />}
                className="flex items-center gap-1.5"
              >
                <LayoutDashboard className="size-3.5 text-primary selection:text-background selection:bg-primary" />
                <span>Client</span>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {isRootDashboard ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <span>Overview</span>
                    <span className="size-1.5 bg-primary selection:text-background selection:bg-primary inline-block ml-1" />
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              segments.slice(2).map((segment, index, array) => {
                const isLast = index === array.length - 1;
                const href = `/dashboard/client/${array
                  .slice(0, index + 1)
                  .join('/')}`;

                // Check if segment looks like a listing ID (cuid format)
                const isListingId = /^[a-z0-9]{20,}$/.test(segment);
                const label = isListingId
                  ? 'Listing Details'
                  : PATH_NAME_MAP[segment.toLowerCase()] ||
                    segment.replace(/-/g, ' ');

                return (
                  <div key={href} className="inline-flex items-center gap-1.5">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>
                          <span className="capitalize">{label}</span>
                          <span className="size-1.5 bg-primary selection:text-background selection:bg-primary inline-block ml-1" />
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
            Client Portal
          </span>
        </div>
      </div>
    </div>
  );
}
