import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <main className="relative min-h-screen bg-background px-6 py-24 md:px-10 md:py-32 flex flex-col justify-center">
      <div className="w-full max-w-[480px] mx-auto">
        <SignupForm />
      </div>
    </main>
  );
}
