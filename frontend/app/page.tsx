'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SignupForm } from '@/components/auth/signup-form';
import { LoginForm } from '@/components/auth/login-form';

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="flex gap-2 mb-6">
          <Button
            variant={isLogin ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </Button>
          <Button
            variant={!isLogin ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </Button>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Page;
