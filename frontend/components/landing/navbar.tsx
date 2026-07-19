'use client';
import { motion } from 'motion/react';

export default function Nav() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border"
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <button
          onClick={() => scrollTo('top')}
          data-testid="nav-brand"
          className="font-editorial font-bold text-lg md:text-xl tracking-tight"
        >
          cre8ive
          <span className="text-primary">-</span>
          cult
          <span className="ml-2 font-mono text-[10px] align-super opacity-60">
            ™
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase">
          <button
            data-testid="nav-manifesto"
            onClick={() => scrollTo('manifesto')}
            className="link-line"
          >
            Manifesto
          </button>

          <button
            data-testid="nav-cults"
            onClick={() => scrollTo('cults')}
            className="link-line"
          >
            Cults
          </button>

          <button
            data-testid="nav-escrow"
            onClick={() => scrollTo('escrow')}
            className="link-line"
          >
            Escrow
          </button>
        </nav>

        <button
          onClick={() => scrollTo('waitlist')}
          className="group relative border border-border px-4 md:px-5 py-2 font-mono text-[11px] uppercase tracking-widest overflow-hidden"
        >
          <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

          <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-500">
            Join Waitlist &nbsp;→
          </span>
        </button>
      </div>
    </motion.header>
  );
}
