'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CultDiscoverItem } from './mock-data';
import { Users, Star, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/cn';

interface CultDiscoverCardProps {
  cult: CultDiscoverItem;
  href?: string;
}

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

export function CultDiscoverCard({ cult, href }: CultDiscoverCardProps) {
  const isAvailable = cult.availability === 'AVAILABLE';
  const targetHref = href || `/discover/cult/${cult.slug}`;

  return (
    <motion.div
      layout
      transition={springTransition}
      className="w-full min-w-0 overflow-hidden"
    >
      <Link
        href={targetHref}
        className="group relative border border-border bg-card overflow-hidden hover:border-foreground transition-colors cursor-pointer w-full flex flex-col h-full justify-between min-w-0"
      >
        {/* Top Section */}
        <motion.div
          layout
          transition={springTransition}
          className="flex flex-col w-full min-w-0"
        >
          {/* Image Container */}
          <motion.div
            layout
            transition={springTransition}
            className="relative overflow-hidden border-border shrink-0 h-48 sm:h-52 w-full border-b"
          >
            <img
              src={cult.coverImage}
              alt={cult.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

            {/* Availability status */}
            <div className="absolute top-3 right-3">
              <span
                className={cn(
                  'status-tag text-[9px]',
                  isAvailable ? 'status-tag--positive' : 'status-tag--neutral'
                )}
              >
                {isAvailable ? 'AVAILABLE' : 'BOOKING AHEAD'}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase text-white/90">
              📍 {cult.location}
            </div>
          </motion.div>

          {/* Content Info Area */}
          <motion.div
            layout
            transition={springTransition}
            className="space-y-2 min-w-0 p-5"
          >
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-2 min-w-0">
                <span className="truncate">{cult.name}</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </h3>
            </div>

            <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {cult.tagline}
            </p>

            {/* Member Roster Preview */}
            <div className="space-y-1.5 min-w-0 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground min-w-0">
                <span className="flex items-center gap-1 min-w-0 truncate">
                  <Users className="w-3 h-3 text-primary selection:text-background selection:bg-primary shrink-0" />
                  {cult.members.length} Members
                </span>
                <span className="shrink-0 ml-1">{cult.turnaround}</span>
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <div className="flex -space-x-2 shrink-0">
                  {cult.members.slice(0, 4).map((m) => (
                    <Avatar key={m.id} className="border border-border w-7 h-7">
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback className="font-mono text-[8px]">
                        {m.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-muted-foreground truncate uppercase min-w-0">
                  {cult.members
                    .map((m) => m.role)
                    .slice(0, 2)
                    .join(' • ')}
                </span>
              </div>
            </div>

            {/* Top 2 disciplines */}
            <div className="flex flex-wrap gap-1 pt-1 min-w-0 overflow-hidden">
              {cult.disciplines.slice(0, 2).map((d) => (
                <span
                  key={d}
                  className="font-mono text-[9px] uppercase tracking-wider border border-border/80 bg-background px-2 py-0.5 text-foreground font-medium truncate max-w-full"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Rate & Actions */}
        <motion.div
          layout
          transition={springTransition}
          className="px-5 py-3 border-t border-border bg-background flex items-center justify-between font-mono text-xs min-w-0 overflow-hidden"
        >
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-[9px] text-muted-foreground">
                from
              </span>
              <span className="font-bold text-primary selection:text-background selection:bg-primary text-sm sm:text-base font-mono">
                {cult.startingPrice}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 font-mono text-xs">
            <Star className="w-3.5 h-3.5 fill-primary text-primary selection:text-background selection:bg-primary" />
            <span className="font-bold text-foreground">{cult.rating}</span>
            <span className="text-muted-foreground text-[10px]">
              ({cult.completedProjects} done)
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
