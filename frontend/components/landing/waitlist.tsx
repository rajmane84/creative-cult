'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { JoinAs } from '@/types';
import {
  useWaitlistCount,
  useJoinWaitlist,
} from '@/hooks/waitlist/use-waitlist';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [joinAs, setJoinAs] = useState<JoinAs>(JoinAs.FREELANCER);
  const [submitted, setSubmitted] = useState(false);

  const { data: count, isLoading: isCountLoading } = useWaitlistCount();
  const joinMutation = useJoinWaitlist();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error("Enter a valid email — we're picky.");
      return;
    }

    joinMutation.mutate(
      { email, joinAs },
      {
        onSuccess: () => {
          setSubmitted(true);
          setEmail('');
          setTimeout(() => {
            setSubmitted(false);
          }, 1000);
        },
      }
    );
  };

  return (
    <section
      id="waitlist"
      className="relative border-b border-border bg-background px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mb-12 grid grid-cols-12 gap-6 border-b border-border pb-8 md:mb-20 md:pb-14">
        <div className="col-span-12 font-mono text-[11px] uppercase tracking-widest opacity-70 md:col-span-4">
          / V — Enlist
        </div>

        <h2 className="font-display col-span-12 text-[13vw] leading-[0.85] md:col-span-8 md:text-[8.5vw]">
          Join the <br className="hidden md:block" />
          <span className="text-primary">cult.</span>{' '}
          <span className="text-outline">Quietly.</span>
        </h2>
      </div>

      <form
        onSubmit={submit}
        data-testid="waitlist-form"
        className="grid grid-cols-12 gap-6 md:gap-10"
      >
        {/* Left */}
        <div className="col-span-12 md:col-span-8">
          <label className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            /01 — I'm joining as a
          </label>

          <div className="mt-3 flex flex-wrap gap-3">
            {[
              { k: 'FREELANCER', label: 'Solo Freelancer' },
              { k: 'COLLECTIVE', label: 'Cult / Collective' },
              { k: 'CLIENT', label: 'Client, hiring' },
            ].map((opt) => (
              <button
                key={opt.k}
                type="button"
                onClick={() => setJoinAs(opt.k as JoinAs)}
                disabled={joinMutation.isPending}
                data-testid={`role-${opt.k}`}
                className={`group relative overflow-hidden border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest ${
                  joinAs === opt.k ? 'bg-foreground text-background' : ''
                } ${joinMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="relative z-10">{opt.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-12">
            <label className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              /02 — Send it to
            </label>

            <div className="mt-2 flex items-end gap-4 border-b-2 border-border pb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={joinMutation.isPending}
                placeholder="you@studio.com"
                data-testid="waitlist-email-input"
                className="font-editorial placeholder:text-foreground/25 flex-1 min-w-0 bg-transparent text-3xl tracking-tight outline-none md:text-6xl disabled:opacity-50"
              />

              <motion.button
                whileTap={{ scale: joinMutation.isPending ? 1 : 0.96 }}
                type="submit"
                disabled={joinMutation.isPending}
                data-testid="waitlist-submit-btn"
                className="group relative shrink-0 whitespace-nowrap overflow-hidden border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-widest md:px-8 md:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />

                <span className="relative z-10 transition-colors duration-500 group-hover:text-primary-foreground">
                  {joinMutation.isPending
                    ? 'Enlisting...'
                    : submitted
                      ? "You're in ✓"
                      : 'Enlist →'}
                </span>
              </motion.button>
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase opacity-60">
              No spam. One invite when your seat opens. Unsubscribe with a
              single click.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 flex flex-col justify-between gap-6 border-l border-transparent md:col-span-4 md:border-border md:pl-8">
          <div>
            <div className="font-mono text-[10px] uppercase opacity-60">
              / Live counter
            </div>

            <div className="font-display mt-2 text-6xl leading-none md:text-7xl">
              {isCountLoading || count === undefined
                ? '...'
                : count.toLocaleString()}
            </div>

            <div className="mt-2 font-mono text-[10px] uppercase opacity-70">
              creatives on the list
            </div>
          </div>

          <blockquote className="font-editorial border-t border-border pt-6 text-lg leading-snug md:text-xl">
            "Finally a platform that treats us like directors, not workers."
            <footer className="mt-3 font-mono text-[10px] uppercase opacity-60">
              — Ish. — Filmmaker · Cult "Wildframe"
            </footer>
          </blockquote>
        </div>
      </form>
    </section>
  );
}
