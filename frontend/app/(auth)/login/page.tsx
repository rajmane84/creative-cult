import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-background px-6 py-24 md:px-10 md:py-32 flex flex-col justify-center">
      <div className="w-full max-w-[480px] mx-auto">
        <LoginForm />
      </div>
    </main>
  );
}
