'use client';

import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const ease = [0.76, 0, 0.24, 1] as const;

export function CultHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border pb-6 sm:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="space-y-2"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <span>/ Creative Dashboard</span>
          <span className="w-1.5 h-1.5 bg-primary selection:text-background selection:bg-primary inline-block" />
          <span>Cults</span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Your{' '}
          <span className="text-primary selection:text-background selection:bg-primary">
            cults
          </span>
        </h1>

        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-xl">
          Manage the cults you lead or belong to. Collaborate with top creatives
          and win briefs together.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="shrink-0"
      >
        <Button
          onClick={() => alert('Create cult button clicked')}
          className="w-full sm:w-auto gap-2"
        >
          <Plus className="size-4" />
          <span>Create cult</span>
        </Button>
      </motion.div>
    </div>
  );
}
