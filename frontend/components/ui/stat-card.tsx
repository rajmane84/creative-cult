'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

const ease = [0.76, 0, 0.24, 1] as const;

// ---------- Root ----------
export interface StatCardProps {
  children: ReactNode;
  animationDelay?: number;
  className?: string;
}

export function StatCard({
  children,
  animationDelay = 0.1,
  className = '',
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: animationDelay,
        ease,
      }}
      className={cn(
        'p-5 sm:p-6 bg-card border border-border flex flex-col justify-between gap-4 relative overflow-hidden group transition-colors duration-200',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ---------- Top Header Section ----------
export function StatCardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3.5', className)}>{children}</div>
  );
}

export function StatCardIcon({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'w-11 h-11 border border-border bg-background flex items-center justify-center shrink-0 transition-colors',
        className
      )}
    >
      <Icon className="w-5 h-5 text-primary selection:text-background selection:bg-primary" />
    </div>
  );
}

export function StatCardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        'font-editorial text-base sm:text-lg font-bold leading-snug text-foreground',
        className
      )}
    >
      {children}
    </h3>
  );
}

// ---------- Content & Metrics Section ----------
export function StatCardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('space-y-1 mt-1', className)}>{children}</div>;
}

export function StatCardValue({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCardSubtext({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-mono text-[11px] text-muted-foreground tracking-wide',
        className
      )}
    >
      {children}
    </p>
  );
}
