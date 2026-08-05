import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';

export default async function NewListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole('CLIENT');

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  if (user.role !== UserRole.CLIENT) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
