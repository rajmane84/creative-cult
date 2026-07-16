'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { ROLE_ROUTES } from '@/constants';
import Loader from '@/components/loader';
import { useSignOut } from '@/hooks/auth/use-sign-out';
import { UserRole } from '@/types';

const AdminDashboard = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    } else if (!isPending && session && session.user?.role !== 'ADMIN') {
      const role = session.user?.role;

      if (role && ROLE_ROUTES[role]) {
        router.push(ROLE_ROUTES[role]);
      } else {
        router.push('/');
      }
    }
  }, [session, isPending, router]);

  const handleSignOut = useSignOut();

  const user = session?.user;

  if (isPending) {
    return <Loader />;
  }

  if (!session || session.user?.role !== UserRole.ADMIN) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <nav className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
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
                Welcome, {user?.name || 'Admin'}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage user accounts and permissions
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Content Moderation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Review and moderate platform content
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Platform Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                View platform usage and statistics
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
