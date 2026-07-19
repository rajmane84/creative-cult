'use client';
import { motion } from 'motion/react';
import { useState } from 'react';

const ease = [0.76, 0, 0.24, 1] as const;

interface ColumnProps {
  side: 'solo' | 'cult';
  kicker: string;
  title: string;
  desc: string;
  bullets: string[];
  testid: string;
}

export default function Duality() {
  const [hovered, setHovered] = useState<'solo' | 'cult' | null>(null);

  const Column = ({
    side,
    kicker,
    title,
    desc,
    bullets,
    testid,
  }: ColumnProps) => {
    const isActive = hovered === side;
    const dim = hovered && hovered !== side;

    return (
      <motion.div
        onMouseEnter={() => setHovered(side)}
        onMouseLeave={() => setHovered(null)}
        data-testid={testid}
        animate={{
          backgroundColor: isActive ? 'var(--primary)' : 'var(--background)',
          color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)',
          opacity: dim ? 0.55 : 1,
        }}
        transition={{ duration: 0.55, ease }}
        className="relative flex min-h-[70vh] flex-col justify-between px-6 py-16 md:px-14 md:py-28"
      >
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
          <span className="opacity-70">/ {kicker}</span>
          <span>{side === 'solo' ? 'A' : 'B'}</span>
        </div>

        <h3 className="font-display mt-6 text-[22vw] leading-[0.82] md:text-[14vw]">
          {title}
        </h3>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2">
          <p className="font-editorial max-w-md text-xl leading-tight md:text-2xl">
            {desc}
          </p>

          <ul className="space-y-2 border-current/40 font-mono text-[11px] uppercase md:border-l md:pl-6">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="opacity-60">0{i + 1}</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="cults"
      data-testid="duality-section"
      className="relative grid border-b border-border md:grid-cols-2"
    >
      <div className="border-border md:border-r">
        <Column
          side="solo"
          testid="duality-solo"
          kicker="Path A — Solo"
          title="Solo."
          desc="Fly alone. Build a stark, editorial portfolio. Set your rate, own your voice, and get discovered by clients who already speak your language."
          bullets={[
            'One-person studio',
            'Curated inbound briefs',
            'Escrow-protected pay',
            'Portfolio-first ranking',
          ]}
        />
      </div>

      <div>
        <Column
          side="cult"
          testid="duality-cult"
          kicker="Path B — Cult"
          title="Cult."
          desc="Form a collective. Package your crew into one bookable unit. Sell productions instead of hours. Split invoices automatically."
          bullets={[
            'Up to 12 members',
            'Bundled service tiers',
            'Auto revenue splits',
            'One brief, one crew',
          ]}
        />
      </div>

      <div className="flex items-center justify-between border-t border-border px-6 py-4 font-mono text-[10px] uppercase md:col-span-2 md:px-10">
        <span>Choose your path — you can switch anytime.</span>
        <span className="text-primary">Hover ↔ to compare</span>
      </div>
    </section>
  );
}
