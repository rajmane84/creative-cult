'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import Image from 'next/image';

const ClientDashboard = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    } else if (!isPending && session && session.user?.role !== 'CLIENT') {
      // Redirect to appropriate page based on role
      const role = session.user?.role;
      if (role === 'CLIENT') {
        router.push('/dashboard/client');
      } else if (role === 'CREATIVE') {
        router.push('/dashboard/creative');
      } else if (role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else {
        router.push('/select-role');
      }
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Signed out successfully');
      router.push('/login');
    } catch {
      toast.error('Failed to sign out');
    }
  };

  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'CLIENT') {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <nav className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Client Dashboard
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
              <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome, {user?.name || 'Client'}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user!.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Post a Project
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create a new project and hire talented creatives
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Browse Creatives
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find and connect with creative professionals
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
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
};

export default ClientDashboard;
