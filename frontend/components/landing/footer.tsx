'use client';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-background px-6 pt-16 pb-6 md:px-10 md:pt-24"
    >
      {/* Meta row */}
      <div className="mb-10 grid grid-cols-12 gap-6 border-b border-border pb-10">
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] uppercase opacity-60">
            / Contact
          </div>

          <div className="font-editorial mt-2 text-xl">
            hello@cre8ive-cult.co
          </div>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="font-mono text-[10px] uppercase opacity-60">
            / Platform
          </div>

          <ul className="font-editorial mt-2 space-y-1 text-lg">
            <li>
              <a className="link-line" href="#manifesto">
                Manifesto
              </a>
            </li>

            <li>
              <a className="link-line" href="#cults">
                Solo vs Cult
              </a>
            </li>

            <li>
              <a className="link-line" href="#escrow">
                Escrow
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="font-mono text-[10px] uppercase opacity-60">
            / Follow
          </div>

          <ul className="font-editorial mt-2 space-y-1 text-lg">
            <li>
              <a
                className="link-line"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Instagram
              </a>
            </li>

            <li>
              <a
                className="link-line"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Are.na
              </a>
            </li>

            <li>
              <a
                className="link-line"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Vimeo
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] uppercase opacity-60">
            / Status
          </div>

          <div className="font-editorial mt-2 flex items-center gap-2 text-lg">
            <span className="inline-block h-2 w-2 animate-pulse bg-primary" />
            Waitlist open — Ch. 01
          </div>
        </div>
      </div>

      {/* Massive wordmark */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative select-none"
      >
        <h3 className="font-display text-[22vw] leading-[0.82] tracking-tight text-foreground">
          cre8ive
          <span className="text-primary">-</span>
          cult
        </h3>
      </motion.div>

      {/* Bottom rail */}
      <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-4 font-mono text-[10px] uppercase md:flex-row md:items-center">
        <span>© 2026 cre8ive-cult — Made by cults, for cults.</span>

        <span className="opacity-60">v0.1.0 · prologue</span>
      </div>
    </footer>
  );
}
