import { ROLE_ROUTES } from '@/constants';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import { redirect } from 'next/navigation';

export default async function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole('ADMIN');

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  if (user.role !== UserRole.ADMIN) {
    const role = user.role;
    if (role && ROLE_ROUTES[role]) {
      redirect(ROLE_ROUTES[role]);
    } else {
      redirect('/');
    }
  }

  return <>{children}</>;
}
