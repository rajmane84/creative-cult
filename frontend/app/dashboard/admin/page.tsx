import { redirect } from 'next/navigation';
import Image from 'next/image';
import { ROLE_ROUTES } from '@/constants';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';

export default async function AdminDashboard() {
  const session = await requireRole('ADMIN');

  if (!session) {
    // Redirect to appropriate page based on authentication/authorization
    redirect('/login');
  }

  const user = session.user;

  // Double-check role for security
  if (user.role !== UserRole.ADMIN) {
    const role = user.role;
    if (role && ROLE_ROUTES[role]) {
      redirect(ROLE_ROUTES[role]);
    } else {
      redirect('/');
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-4 mb-6">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User'}
                className="h-16 w-16 rounded-full object-cover"
                height={100}
                width={100}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-slate-700 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome, {user?.name || 'Admin'}!
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                User Management
              </h3>
              <p className="text-gray-600 text-sm">
                Manage user accounts and permissions
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Content Moderation
              </h3>
              <p className="text-gray-600 text-sm">
                Review and moderate platform content
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Platform Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                View platform usage and statistics
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
