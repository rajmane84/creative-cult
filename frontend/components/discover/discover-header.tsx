'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Zap, Users } from 'lucide-react';

export function DiscoverHeader() {
  return (
    <section className="relative border-b border-border bg-background px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-16 overflow-hidden w-full">
      {/* Background Accent Grid with smooth bottom fade effect */}
      <BackgroundGridLines />

      <div className="relative w-full space-y-6">
        {/* Breadcrumb & Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          <span className="text-foreground font-semibold">/ DISCOVER</span>
          <span>—</span>
          <span>INDEX OF COLLECTIVES & INDEPENDENTS</span>
          <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-primary/30 bg-primary/10 text-primary font-mono text-[10px] uppercase tracking-wider selection:text-background selection:bg-primary">
            <span className="size-1.5 rounded-full bg-primary animate-ping" />
            LIVE DIRECTORY
          </span>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 lg:col-span-8 space-y-3"
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.88] uppercase text-foreground">
              DISCOVER{' '}
              <span className="text-primary selection:text-background selection:bg-primary">
                CREATIVE COLLECTIVES
              </span>
            </h1>

            <p className="font-editorial text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
              Explore vetted creative collectives and independent visionaries.
              Book multi-disciplinary teams with one brief and guaranteed escrow
              protection.
            </p>
          </motion.div>

          {/* Quick Platform Metrics Callout */}
          <QuickStats />
        </div>
      </div>
    </section>
  );
}

function BackgroundGridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]"
      style={{
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
      }}
    />
  );
}

function QuickStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="col-span-12 lg:col-span-4"
    >
      <div className="border border-border bg-card p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground border-b border-border/60 pb-2">
          <span>DIRECTORY STATS</span>
          <Sparkles className="size-3.5 text-primary selection:text-background selection:bg-primary" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-display text-2xl sm:text-3xl text-foreground">
              48+
            </div>
            <div className="font-mono text-[10px] uppercase text-muted-foreground flex items-center gap-1">
              <Users className="size-3 text-primary selection:text-background selection:bg-primary" />
              Vetted Collectives
            </div>
          </div>

          <div>
            <div className="font-display text-2xl sm:text-3xl text-foreground">
              210+
            </div>
            <div className="font-mono text-[10px] uppercase text-muted-foreground flex items-center gap-1">
              <Zap className="size-3 text-primary selection:text-background selection:bg-primary" />
              Creatives
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border/60 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-primary selection:text-background selection:bg-primary" />
            100% Escrow Protected
          </span>
          <span className="text-foreground font-bold">99.4% On-time</span>
        </div>
      </div>
    </motion.div>
  );
}
