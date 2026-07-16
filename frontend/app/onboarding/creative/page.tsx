'use client';

import React from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Upload, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreativeOnboardingPage() {
  const { currentStep, setCurrentStep, totalSteps } = useOnboarding();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submit action
      window.location.href = '/dashboard';
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Animation variants for tasteful micro-interactions
  const pageVariants = {
    initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
  };

  return (
    <div className="flex flex-col flex-1 relative">
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 max-w-xl"
            >
              <div>
                <h1 className="font-outfit text-4xl font-semibold tracking-tight text-black mb-3">
                  Let's get the basics
                </h1>
                <p className="text-zinc-500 text-lg">
                  Tell us who you are and what you do. This will be the first
                  thing clients see.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black">
                    Professional Headline
                  </label>
                  <Input
                    placeholder="e.g. Award-winning Motion Designer"
                    className="h-12 bg-white/50 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black">
                    Category
                  </label>
                  <select className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-white/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors">
                    <option value="" disabled selected>
                      Select your primary focus
                    </option>
                    <option value="motion">Motion Design</option>
                    <option value="photo">Photography</option>
                    <option value="illustration">Illustration</option>
                    <option value="3d">3D Art</option>
                    <option value="uiux">UI/UX Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black">
                    Short Bio
                  </label>
                  <Textarea
                    placeholder="Tell a quick story about your journey..."
                    className="min-h-[120px] bg-white/50 focus:bg-white transition-colors resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 max-w-xl"
            >
              <div>
                <h1 className="font-outfit text-4xl font-semibold tracking-tight text-black mb-3">
                  Your experience
                </h1>
                <p className="text-zinc-500 text-lg">
                  Clients value transparency. Let them know where you stand.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black">
                      Years of Experience
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 5"
                      className="h-12 bg-white/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black">
                      Hourly Rate
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-zinc-500">
                        $
                      </span>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        className="h-12 pl-8 bg-white/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="font-semibold text-black">Recent Role</h3>
                  <div className="space-y-4 p-6 rounded-xl border border-black/5 bg-white/50">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
                        Role Title
                      </label>
                      <Input
                        placeholder="Senior Designer"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
                        Company (Optional)
                      </label>
                      <Input
                        placeholder="Acme Corp or Freelance"
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 max-w-xl"
            >
              <div>
                <h1 className="font-outfit text-4xl font-semibold tracking-tight text-black mb-3">
                  Your skills
                </h1>
                <p className="text-zinc-500 text-lg">
                  Add up to 5 core skills that define your craft.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. Cinema 4D, Typography, Retouching"
                    className="h-12 bg-white/50 focus:bg-white transition-colors flex-1"
                  />
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-lg bg-black text-white hover:bg-black/90 shrink-0"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Figma', 'After Effects', 'Illustration'].map(
                    (skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 bg-white border border-black/10 rounded-full text-sm font-medium text-black flex items-center gap-2 group cursor-pointer hover:border-black transition-colors"
                      >
                        {skill}
                        <span className="text-zinc-400 group-hover:text-black transition-colors">
                          &times;
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 max-w-xl"
            >
              <div>
                <h1 className="font-outfit text-4xl font-semibold tracking-tight text-black mb-3">
                  Show your work
                </h1>
                <p className="text-zinc-500 text-lg">
                  Upload a standout piece from your portfolio. You can add more
                  later.
                </p>
              </div>

              <div className="space-y-6">
                <div className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-black/10 rounded-2xl bg-white/30 hover:bg-white/50 transition-all cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-4 text-center p-6"
                  >
                    <div className="h-16 w-16 rounded-full bg-black/5 flex items-center justify-center text-black">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-black">
                        Click or drag to upload
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        High-res images or MP4s (max 20MB)
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-sm font-semibold text-black">
                    Project Title
                  </label>
                  <Input
                    placeholder="Give it a name"
                    className="h-12 bg-white/50 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="sticky bottom-0 pt-8 pb-4 mt-8 bg-linear-to-t from-[#faf9f7] via-[#faf9f7] to-transparent">
        <div className="flex items-center justify-between max-w-xl">
          <Button
            variant="ghost"
            onClick={handleBack}
            className={`text-zinc-500 hover:text-black hover:bg-black/5 ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            className="bg-black text-white hover:bg-black/90 shadow-lg shadow-black/10 rounded-full px-8 py-6 text-base font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentStep === totalSteps ? 'Complete Profile' : 'Continue'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
