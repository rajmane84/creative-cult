import { ROLE_ROUTES } from '@/constants';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import { redirect } from 'next/navigation';
import { CreativeDashboardBreadcrumbs } from '@/components/creative/dashboard';

export default async function CreativeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole('CREATIVE');

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  if (user.role !== UserRole.CREATIVE) {
    const role = user.role;
    if (role && ROLE_ROUTES[role]) {
      redirect(ROLE_ROUTES[role]);
    } else {
      redirect('/');
    }
  }

  return (
    <div className="w-full flex-1 flex flex-col">
      <CreativeDashboardBreadcrumbs />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
