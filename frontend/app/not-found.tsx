'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Compass, Loader2 } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [clickedHref, setClickedHref] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground">
      {/* Decorative background grid, matching the discover page treatment */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{
          staggerChildren: shouldReduceMotion ? 0 : 0.08,
          delayChildren: shouldReduceMotion ? 0 : 0.05,
        }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        {/* Status line */}
        <motion.div
          variants={item}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span>Error 404 — Page Not Found</span>
        </motion.div>

        {/* Large 404 Display */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="relative mb-4 select-none font-display text-8xl font-black tracking-tighter sm:text-9xl md:text-[12rem] leading-none"
        >
          <span className="text-primary selection:bg-primary selection:text-background">
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          transition={{ duration: 0.6 }}
          className="mb-4 text-balance font-editorial text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl"
        >
          Lost in the Creative Void
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          transition={{ duration: 0.6 }}
          className="mb-8 max-w-md text-pretty font-body text-base text-muted-foreground sm:text-lg"
        >
          The page or collective you are searching for does not exist, has been
          disbanded, or was moved to another realm.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            disabled={clickedHref !== null}
            className="w-full shadow-[4px_4px_0px_0px_var(--foreground)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[6px_6px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_var(--foreground)] disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_0px_var(--foreground)] sm:w-auto"
            render={<Link href="/" onClick={() => setClickedHref('/')} />}
          >
            <span className="flex items-center justify-center gap-2">
              {clickedHref === '/' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Home className="size-4" />
              )}
              <span>Return Home</span>
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            disabled={clickedHref !== null}
            className="w-full shadow-[4px_4px_0px_0px_var(--foreground)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[6px_6px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_var(--foreground)] disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_0px_var(--foreground)] sm:w-auto"
            render={
              <Link
                href="/discover"
                onClick={() => setClickedHref('/discover')}
              />
            }
          >
            <span className="flex items-center justify-center gap-2">
              {clickedHref === '/discover' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Compass className="size-4" />
              )}
              <span>Explore Cults</span>
            </span>
          </Button>
        </motion.div>

        {/* Back Button */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft className="size-3.5" />
          <button
            type="button"
            onClick={() => router.back()}
            className="link-line inline-flex items-center justify-center cursor-pointer gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Go back to previous page</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative Corner Accents */}
      <div className="pointer-events-none absolute bottom-6 left-6 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
        [ SYS.ERR.404 ]
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
        [ CRE8IVE-CULT ]
      </div>
    </div>
  );
}
