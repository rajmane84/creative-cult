import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign up to get started
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
