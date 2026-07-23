import { verifySession } from '@/lib/session';

export default async function AdminDashboard() {
  const session = await verifySession();
  const user = session?.user;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      This is admin dashboard page Welcome, {user?.name}
    </div>
  );
}
