import { redirect } from 'next/navigation';
import Image from 'next/image';
import { ROLE_ROUTES } from '@/constants';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import { SignOutButton } from '@/components/auth/sign-out-button';

export default async function ClientDashboard() {
  const session = await requireRole('CLIENT');

  if (!session) {
    // Redirect to appropriate page based on authentication/authorization
    redirect('/login');
  }

  const user = session.user;

  // Double-check role for security
  if (user.role !== UserRole.CLIENT) {
    const role = user.role;
    if (role && ROLE_ROUTES[role]) {
      redirect(ROLE_ROUTES[role]);
    } else {
      redirect('/');
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <nav className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Client Dashboard
            </h1>
            <SignOutButton variant="outline" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome, {user?.name || 'Client'}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Post a Project
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create a new project and hire talented creatives
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Browse Creatives
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find and connect with creative professionals
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                My Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your ongoing and past projects
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
