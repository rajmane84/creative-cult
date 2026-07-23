'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, type LucideIcon } from 'lucide-react';

const ease = [0.76, 0, 0.24, 1] as const;

// ---------- Root ----------
interface ActionCardProps {
  children: ReactNode;
  dismissible?: boolean;
  isVisible?: boolean;
  animationDelay?: number;
  className?: string;
}

export function ActionCard({
  children,
  dismissible = false,
  isVisible = true,
  animationDelay = 0.2,
  className = '',
}: ActionCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        dismissible
          ? { opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }
          : undefined
      }
      transition={{
        duration: dismissible ? 0.5 : 0.6,
        delay: animationDelay,
        ease,
      }}
      className={`p-6 bg-card border border-border flex flex-col justify-between gap-6 relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );

  if (!dismissible) return content;

  return <AnimatePresence>{isVisible && content}</AnimatePresence>;
}

// ---------- Top section ----------
export function ActionCardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">{children}</div>
  );
}

export function ActionCardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="w-12 h-12 border border-border bg-background flex items-center justify-center shrink-0">
      <Icon className="w-6 h-6 text-primary selection:text-background selection:bg-primary" />
    </div>
  );
}

export function ActionCardEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
      <span>/ {children}</span>
    </div>
  );
}

export function ActionCardBadge({
  tone = 'default',
  children,
}: {
  tone?: 'attention' | 'default';
  children: ReactNode;
}) {
  return (
    <span
      className={`status-tag py-0 px-1.5 text-[8px] ${
        tone === 'attention' ? 'status-tag--attention' : ''
      }`}
    >
      {children}
    </span>
  );
}

export function ActionCardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-editorial text-lg md:text-xl font-bold leading-snug text-foreground">
      {children}
    </h3>
  );
}

export function ActionCardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="font-body text-xs md:text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function ActionCardMedia({ children }: { children: ReactNode }) {
  return <div className="shrink-0">{children}</div>;
}

export function ActionCardDismiss({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Dismiss banner"
      className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
    >
      <X className="w-4 h-4" />
    </button>
  );
}

// ---------- Bottom section ----------
export function ActionCardFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-t border-border/60 pt-4 mt-2">
      {children}
    </div>
  );
}
