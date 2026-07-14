'use client';

import React from 'react';
import { useOnboarding } from './OnboardingContext';
import { Check, User, Briefcase, Zap, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 1, title: 'Basic Info', icon: User, description: 'Who are you?' },
  {
    id: 2,
    title: 'Experience',
    icon: Briefcase,
    description: 'Your background',
  },
  { id: 3, title: 'Skills', icon: Zap, description: 'What you do best' },
  { id: 4, title: 'Portfolio', icon: ImageIcon, description: 'Show your work' },
];

export function CreativeLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentStep } = useOnboarding();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f7] text-zinc-900 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-[#faf9f7]/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white font-outfit font-bold tracking-tighter">
              CC
            </div>
            <span className="font-outfit font-semibold tracking-tight text-lg">
              Creative Cult
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-500">
              Step {currentStep} of {steps.length}
            </span>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
            >
              Save & Exit
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 flex-col border-r border-black/5 bg-white/50 backdrop-blur-sm p-8">
          <div className="mb-8">
            <h2 className="font-outfit font-semibold text-2xl tracking-tight mb-2">
              Build your profile
            </h2>
            <p className="text-sm text-zinc-500">
              Let clients know what makes you unique.
            </p>
          </div>

          <nav className="flex flex-col gap-6 relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-4 bottom-8 w-px bg-black/5" />

            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;

              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-black bg-black text-white'
                        : isPast
                          ? 'border-black bg-black text-white'
                          : 'border-black/10 bg-white text-zinc-400'
                    }`}
                  >
                    {isPast ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <span className="text-xs font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="flex flex-col pt-1">
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive || isPast ? 'text-black' : 'text-zinc-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`text-xs ${isActive || isPast ? 'text-zinc-500' : 'text-zinc-400/50'}`}
                    >
                      {step.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto flex flex-col relative">
          <div className="mx-auto max-w-3xl w-full flex-1 flex flex-col p-6 md:p-12 lg:p-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
