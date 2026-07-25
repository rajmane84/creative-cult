'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Compass, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [clickedHref, setClickedHref] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground">
      {/* Decorative Neo-Brutalist Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#0f0f0f 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Large 404 Display */}
        <div className="relative mb-4 select-none font-display text-8xl font-black tracking-tighter sm:text-9xl md:text-[12rem] leading-none">
          <span className="text-primary selection:bg-primary selection:text-background">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-4 font-editorial text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
          Lost in the Creative Void
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-md font-body text-base text-muted-foreground sm:text-lg">
          The page or collective you are searching for does not exist, has been
          disbanded, or was moved to another realm.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Button
            size="lg"
            disabled={clickedHref !== null}
            className="w-full sm:w-auto shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]"
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
            className="w-full sm:w-auto shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]"
            render={
              <Link
                href="/dashboard/creative/cult"
                onClick={() => setClickedHref('/dashboard/creative/cult')}
              />
            }
          >
            <span className="flex items-center justify-center gap-2">
              {clickedHref === '/dashboard/creative/cult' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Compass className="size-4" />
              )}
              <span>Explore Cults</span>
            </span>
          </Button>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">
        [ SYS.ERR.404 ]
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">
        [ CREATIVE CULT ]
      </div>
    </div>
  );
}
