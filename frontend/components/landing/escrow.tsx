'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    code: '01',
    label: 'Client funds escrow',
    detail: 'Money is locked, not spent.',
  },
  {
    code: '02',
    label: 'Cult delivers work',
    detail: 'Milestones or full brief.',
  },
  { code: '03', label: 'Client approves', detail: '72-hr review window.' },
  { code: '04', label: 'Auto-payout', detail: 'Splits paid within 24h.' },
];

export default function Escrow() {
  return (
    <section
      id="escrow"
      data-testid="escrow-section"
      className="relative overflow-hidden border-y border-border bg-foreground text-background px-6 py-24 md:px-10 md:py-40"
    >
      {/* Header */}
      <div className="mb-12 grid grid-cols-12 gap-6 border-b border-background/25 pb-8 md:mb-20 md:pb-14">
        <div className="col-span-12 font-mono text-[11px] uppercase tracking-widest opacity-60 md:col-span-4">
          / IV — Trust Protocol
        </div>

        <h2 className="font-display col-span-12 text-[13vw] leading-[0.85] md:col-span-8 md:text-[9vw]">
          <span className="text-outline-cream">Escrow.</span> Not{' '}
          <br className="hidden md:block" />
          <span>
            promises
            <span className="text-primary">.</span>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-5">
          <p className="font-editorial text-2xl leading-tight text-background md:text-3xl">
            The biggest fear in freelance isn't rejection.
            <br />
            <span className="text-primary">It's non-payment.</span>
          </p>

          <p className="font-body mt-6 max-w-md leading-relaxed text-background/70">
            Every project on cre8ive-cult is guarded by a neutral vault. Funds
            are held the moment a brief is accepted, released the moment the
            client signs off. No invoicing gymnastics. No ghost clients.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="font-display text-6xl leading-none md:text-7xl">
              100%
            </div>

            <div className="font-mono text-[11px] leading-tight uppercase opacity-70">
              Of pay <br />
              protected
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="col-span-12 border border-background/30 md:col-span-7">
          <div className="flex items-center justify-between border-b border-background/25 px-4 py-3 font-mono text-[10px] uppercase">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-primary" />
              <span className="h-2 w-2 bg-background/40" />
              <span className="h-2 w-2 bg-background/40" />
            </div>

            <span className="opacity-60">/cult/vault/tx_00184</span>

            <span className="text-primary">● live</span>
          </div>

          <ul className="divide-y divide-background/15">
            {steps.map((s, i) => (
              <motion.li
                key={s.code}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="group grid grid-cols-12 items-center gap-4 px-4 py-6 transition-colors duration-500 hover:bg-primary hover:text-primary-foreground md:px-6 md:py-8"
                data-testid={`escrow-step-${s.code}`}
              >
                <span className="font-display col-span-2 text-4xl leading-none md:text-6xl">
                  {s.code}
                </span>

                <span className="font-editorial col-span-6 text-xl font-bold tracking-tight md:text-2xl">
                  {s.label}
                </span>

                <span className="col-span-3 font-mono text-[10px] uppercase opacity-60 group-hover:opacity-100">
                  {s.detail}
                </span>

                <span className="col-span-1 text-right font-mono text-lg">
                  →
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-background/25 px-4 py-4 font-mono text-[10px] uppercase md:px-6">
            <span className="opacity-60">
              Escrow partner · Stripe Connect + Razorpay Route
            </span>

            <span className="text-primary">Zero disputes YTD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
