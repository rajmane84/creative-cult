import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="fixed inset-0 overflow-y-auto no-scrollbar bg-background">
      <main className="relative min-h-full px-6 py-12 md:px-10 md:py-24 flex flex-col">
        <div className="w-full max-w-[480px] m-auto">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
