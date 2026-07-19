'use client';
import { motion } from 'motion/react';

const ease = [0.76, 0, 0.24, 1] as const;

const roles = [
  {
    role: 'Photographer',
    img: 'https://images.unsplash.com/photo-1587090564077-c7b8f2f1249e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoZXIlMjBzdHVkaW8lMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3ODQ0MzA1NTF8MA&ixlib=rb-4.1.0&q=85',
    span: 'col-span-12 md:col-span-7 row-span-2',
    height: 'h-[52vh] md:h-[72vh]',
    tag: '01 — Frames',
  },
  {
    role: 'Choreographer',
    img: 'https://images.pexels.com/photos/29016243/pexels-photo-29016243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    span: 'col-span-6 md:col-span-5',
    height: 'h-[30vh] md:h-[35vh]',
    tag: '02 — Motion',
  },
  {
    role: 'Stylist',
    img: 'https://images.pexels.com/photos/37827340/pexels-photo-37827340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    span: 'col-span-6 md:col-span-3',
    height: 'h-[30vh] md:h-[35vh]',
    tag: '03 — Set',
  },
  {
    role: 'Videographer',
    img: 'https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxmaWxtJTIwZGlyZWN0b3IlMjB2aWRlb2dyYXBoZXIlMjBvbnNldHxlbnwwfHx8fDE3ODQ0MzA1NTF8MA&ixlib=rb-4.1.0&q=85',
    span: 'col-span-12 md:col-span-2',
    height: 'h-[30vh] md:h-[35vh]',
    tag: '04 — Lens',
  },
];

export default function CaseStudy() {
  return (
    <section
      data-testid="wedding-section"
      className="relative border-b border-border bg-background px-6 py-24 md:px-10 md:py-40"
    >
      {/* Header */}
      <div className="mb-10 grid grid-cols-12 gap-6 md:mb-14">
        <div className="col-span-12 font-mono text-[11px] uppercase tracking-widest opacity-70 md:col-span-4">
          / III — Case Study 001
        </div>

        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display text-[13vw] leading-[0.85] md:text-[8.5vw]">
            One brief.
            <br />
            <span className="text-primary">Five </span>
            <span>visionaries.</span>
          </h2>

          <p className="font-editorial mt-6 max-w-2xl text-xl leading-tight md:text-2xl">
            A wedding in Udaipur. The client sent a single message. The{' '}
            <em>Sangeet</em> Cult replied — photographer, videographer,
            choreographer, stylist and event manager. One quote. One escrow.
            Zero chasing.
          </p>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 grid-flow-row-dense gap-2 md:gap-3">
        {roles.map((r, i) => (
          <motion.figure
            key={r.role}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease }}
            className={`group relative overflow-hidden border border-border ${r.span} ${r.height}`}
            data-testid={`wedding-role-${r.role.toLowerCase()}`}
          >
            <img
              src={r.img}
              alt={r.role}
              className="absolute inset-0 h-full w-full object-cover grayscale-15 transition-transform duration-1200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
            />

            {/* subtle spotlight overlay */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

            {/* Caption */}
            <figcaption className="text-primary-foreground absolute right-0 bottom-0 left-0 flex items-end justify-between p-3 md:p-4">
              <div>
                <div className="font-mono text-[10px] uppercase opacity-80">
                  {r.tag}
                </div>

                <div className="font-editorial mt-1 text-xl font-bold tracking-tight md:text-3xl">
                  {r.role}
                </div>
              </div>

              <div className="border-primary-foreground font-mono border px-2 py-1 text-[10px] uppercase opacity-90">
                Hire →
              </div>
            </figcaption>
          </motion.figure>
        ))}

        {/* Text tile */}
        <div className="bg-card text-card-foreground col-span-12 flex min-h-[26vh] flex-col justify-between border border-border p-6 md:col-span-5 md:p-8">
          <div className="font-mono text-[10px] uppercase opacity-60">
            / Total
          </div>

          <div>
            <div className="font-display text-6xl md:text-8xl">₹4.2L</div>

            <div className="mt-3 font-mono text-[11px] uppercase opacity-70">
              One invoice · split five ways · held in escrow
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase">
            <span>3-day turnaround</span>
            <span className="text-primary">Booked</span>
          </div>
        </div>

        <div className="col-span-12 flex min-h-[26vh] items-end border border-border p-6 md:col-span-7 md:p-8">
          <p className="font-editorial max-w-2xl text-xl leading-tight md:text-3xl">
            Stop stitching together five freelancers with WhatsApp and prayer.
            <br />
            <span className="text-primary">Book the cult. </span>
            Get the whole production.
          </p>
        </div>
      </div>
    </section>
  );
}
