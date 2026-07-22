import { redirect } from 'next/navigation';
import Image from 'next/image';
import { verifySession } from '@/lib/session';

export default async function CreativeDashboard() {
  const session = await verifySession();
  const user = session?.user;

  // Check if user has completed onboarding
  if (!user?.creativeProfile?.onboardingCompleted) {
    redirect('/onboarding/creative');
  }

  return (
    <div className="h-full bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
                Welcome, {user?.name || 'Creative'}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                My Portfolio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Showcase your best work and projects
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Find Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Browse and apply for client projects
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                My Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Update your skills and experience
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
