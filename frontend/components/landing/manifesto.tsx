'use client';
import { motion } from 'motion/react';

const chapters = [
  {
    n: '01',
    title: 'Curated Chaos.',
    body: 'We reject infinite scroll and shady bidding wars. Every profile is human-vetted. Every cult is auditioned. Taste is the algorithm.',
  },
  {
    n: '02',
    title: 'Hire the Hive.',
    body: 'Book a whole ecosystem in one brief. Weddings, campaigns, film sets — one message, one contract, one invoice, five visionaries.',
  },
  {
    n: '03',
    title: 'No Middlemen.',
    body: '0% commission on your first three projects. After that, a flat tithe — never a bidding tax. Your fee is your fee.',
  },
  {
    n: '04',
    title: 'Art Over Algorithm.',
    body: 'Ranking is decided by peers and clients, not paid tiers. The best work rises. Everything else stays quiet.',
  },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="relative border-b border-border px-6 py-24 md:px-10 md:py-40"
    >
      {/* Header */}
      <div className="mb-12 grid grid-cols-12 gap-6 border-b border-border pb-8 md:mb-20 md:pb-14">
        <div className="col-span-12 font-mono text-[11px] uppercase tracking-widest opacity-70 md:col-span-4">
          / II — Manifesto
        </div>

        <h2 className="font-display col-span-12 text-[13vw] leading-[0.85] md:col-span-8 md:text-[9vw]">
          Four <span className="text-outline">rules</span> we{' '}
          <br className="hidden md:block" />
          refuse to break
          <span className="text-primary">.</span>
        </h2>
      </div>

      <div className="flex flex-col">
        {chapters.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.9,
              delay: i * 0.05,
              ease: [0.76, 0, 0.24, 1],
            }}
            className={`group grid grid-cols-12 items-start gap-4 pt-10 md:gap-8 md:pt-14 ${
              i !== chapters.length - 1 ? 'pb-10 md:pb-14' : ''
            } ${i !== 0 ? 'border-t border-border' : ''}`}
            data-testid={`manifesto-chapter-${c.n}`}
          >
            {/* Number */}
            <div className="font-display col-span-3 text-[16vw] leading-none md:col-span-2 md:text-[9vw]">
              {c.n}
            </div>

            {/* Title */}
            <div className="col-span-9 md:col-span-5">
              <h3 className="font-editorial text-3xl font-bold leading-[0.95] tracking-tight md:text-6xl">
                {c.title}
              </h3>
            </div>

            {/* Body */}
            <div className="col-span-12 border-border md:col-span-5 md:border-l md:pl-6">
              <p className="font-body text-muted-foreground text-base leading-relaxed md:text-lg">
                {c.body}
              </p>

              <div className="mt-4 font-mono text-[10px] uppercase opacity-40 transition-colors duration-500 group-hover:text-primary group-hover:opacity-100">
                Rule {c.n} / Immutable
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
