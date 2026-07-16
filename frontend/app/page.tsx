'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { RoleSelection } from '@/components/auth/role-selection';
import Loader from '@/components/loader';

const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    // Don't redirect unauthenticated users - let them see the landing page
  }, [session, isPending, router]);

  const user = session?.user;

  // Redirect based on user role
  useEffect(() => {
    if (!isPending && session) {
      if (!user?.role) {
        // Show role selection modal
        setShowRoleModal(true);
      } else if (user.role === 'CLIENT') {
        router.push('/dashboard/client');
      } else if (user.role === 'CREATIVE') {
        router.push('/dashboard/creative');
      } else if (user.role === 'ADMIN') {
        router.push('/dashboard/admin');
      }
    }
  }, [session, isPending, user?.role, router]);

  if (isPending) return <Loader />;

  // If user is logged in but has no role, show role selection modal
  if (session && !user?.role) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Creative Cult
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Please select your role to continue
            </p>
          </div>
        </div>
        <RoleSelection
          open={showRoleModal}
          onClose={() => setShowRoleModal(false)}
        />
      </>
    );
  }

  // Show dummy landing page content (for unauthenticated users)
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Creative Cult
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Connect with creatives and bring your projects to life
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                For Clients
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Post projects and find talented creatives
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                For Creatives
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Showcase your work and find opportunities
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Get Started
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join our community today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
