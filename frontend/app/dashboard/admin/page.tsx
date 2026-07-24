import { verifySession } from '@/lib/session';

export default async function AdminDashboard() {
  const session = await verifySession();
  const user = session?.user;

  return (
    <div className="w-full bg-background p-6">
      This is admin dashboard page. Welcome, {user?.name}
    </div>
  );
}
