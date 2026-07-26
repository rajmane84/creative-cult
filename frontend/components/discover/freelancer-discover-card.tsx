'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FreelancerDiscoverItem } from './mock-data';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/cn';

interface FreelancerDiscoverCardProps {
  freelancer: FreelancerDiscoverItem;
  href?: string;
}

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

export function FreelancerDiscoverCard({
  freelancer,
  href,
}: FreelancerDiscoverCardProps) {
  const isAvailable = freelancer.availability === 'AVAILABLE';
  const targetHref = href || `/discover/freelancer/${freelancer.username}`;

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
        {/* Main Details Body */}
        <motion.div
          layout
          transition={springTransition}
          className="flex flex-col w-full min-w-0"
        >
          {/* Header Profile Section */}
          <motion.div
            layout
            transition={springTransition}
            className="space-y-3 min-w-0 p-5 border-b border-border bg-background/50"
          >
            <div className="flex items-start justify-between min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="border-2 border-border shrink-0 w-14 h-14">
                  <AvatarImage
                    src={freelancer.avatarUrl}
                    alt={freelancer.name}
                  />
                  <AvatarFallback className="font-mono text-sm font-bold">
                    {freelancer.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                      {freelancer.name}
                    </h3>
                  </div>

                  <p className="font-mono text-xs text-muted-foreground truncate">
                    @{freelancer.username}
                  </p>

                  <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground mt-0.5 min-w-0">
                    <span className="truncate">📍 {freelancer.location}</span>
                  </div>
                </div>
              </div>

              <span
                className={cn(
                  'status-tag text-[9px] shrink-0 ml-2',
                  isAvailable ? 'status-tag--positive' : 'status-tag--neutral'
                )}
              >
                {isAvailable ? 'AVAILABLE' : 'BUSY'}
              </span>
            </div>

            <p className="font-body text-xs font-medium text-foreground leading-snug line-clamp-2">
              {freelancer.headline}
            </p>
          </motion.div>

          {/* Portfolio Thumbnail Preview Grid */}
          <motion.div
            layout
            transition={springTransition}
            className="p-4 space-y-3 min-w-0 overflow-hidden"
          >
            <div className="font-mono text-[10px] uppercase text-muted-foreground flex items-center justify-between">
              <span>PORTFOLIO SNAPSHOT</span>
              <span>{freelancer.portfolio.length} WORKS</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 min-w-0">
              {freelancer.portfolio.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="relative h-16 overflow-hidden border border-border group-hover:border-foreground/40 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 pt-1 min-w-0 overflow-hidden">
              {freelancer.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[9px] uppercase border border-border/80 bg-background px-2 py-0.5 text-muted-foreground truncate max-w-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Info Bar */}
        <motion.div
          layout
          transition={springTransition}
          className="px-5 py-3 border-t border-border bg-background flex items-center justify-between font-mono text-xs min-w-0 overflow-hidden"
        >
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-foreground text-sm sm:text-base font-mono">
                {freelancer.dailyRate}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground">
                /day
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 font-mono text-xs">
            <Star className="w-3.5 h-3.5 fill-primary text-primary selection:text-background selection:bg-primary" />
            <span className="font-bold text-foreground">
              {freelancer.rating}
            </span>
            <span className="text-muted-foreground text-[10px]">
              ({freelancer.reviewCount})
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
