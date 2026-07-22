'use client';

import { RoleSelection } from '@/components/auth/role-selection';

export function RoleSelectionWrapper() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Creative Cult
          </h1>
          <p className="text-gray-600 mb-8">
            Please select your role to continue
          </p>
        </div>
      </div>
      <RoleSelection open={true} onClose={() => {}} />
    </>
  );
}
