import { ROLE_ROUTES } from '@/constants';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import { redirect } from 'next/navigation';

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

  return <>{children}</>;
}
