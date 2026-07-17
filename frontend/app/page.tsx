import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/session';
import { ROLE_ROUTES } from '@/constants';
import { RoleSelectionWrapper } from '@/components/auth/role-selection-wrapper';

export default async function HomePage() {
  const session = await verifySession();

  // If user is authenticated with a role, redirect to their dashboard
  if (session && session.user?.role && ROLE_ROUTES[session.user.role]) {
    redirect(ROLE_ROUTES[session.user.role]);
  }

  // If user is authenticated but has no role, show role selection
  if (session && !session.user?.role) {
    return <RoleSelectionWrapper />;
  }

  // Show landing page for unauthenticated users
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
}
