'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FreelancerDiscoverItem } from './mock-data';
import { ViewMode } from './discover-filters';
import { ShieldCheck, Star, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface FreelancerDiscoverCardProps {
  freelancer: FreelancerDiscoverItem;
  viewMode: ViewMode;
  href?: string;
}

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

export function FreelancerDiscoverCard({
  freelancer,
  viewMode,
  href,
}: FreelancerDiscoverCardProps) {
  const isAvailable = freelancer.availability === 'AVAILABLE';
  const isGrid = viewMode === 'GRID';
  const targetHref = href || `/discover/freelancer/${freelancer.username}`;

  return (
    <motion.div layout transition={springTransition} className="w-full">
      <Link
        href={targetHref}
        className={cn(
          'group relative border border-border bg-card overflow-hidden hover:border-foreground transition-colors cursor-pointer w-full flex justify-between',
          isGrid
            ? 'flex-col h-full'
            : 'flex-col md:flex-row md:items-center p-4 sm:p-5 gap-4'
        )}
      >
        {/* Main Details Body */}
        <motion.div
          layout
          transition={springTransition}
          className={cn('flex flex-col', isGrid ? 'w-full' : 'flex-1')}
        >
          {/* Header Profile Section */}
          <motion.div
            layout
            transition={springTransition}
            className={cn(
              'space-y-3',
              isGrid
                ? 'p-5 border-b border-border bg-background/50'
                : 'space-y-1.5'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  className={cn(
                    'border-2 border-border shrink-0',
                    isGrid ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'
                  )}
                >
                  <AvatarImage
                    src={freelancer.avatarUrl}
                    alt={freelancer.name}
                  />
                  <AvatarFallback className="font-mono text-sm font-bold">
                    {freelancer.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {freelancer.name}
                    </h3>
                    {!isGrid && (
                      <span className="font-mono text-xs text-muted-foreground">
                        @{freelancer.username}
                      </span>
                    )}
                    {!isGrid && freelancer.isVerified && (
                      <span className="status-tag status-tag--positive text-[9px]">
                        <ShieldCheck className="w-3 h-3 text-primary selection:text-background selection:bg-primary" />
                        VERIFIED CREATIVE
                      </span>
                    )}
                  </div>

                  {isGrid && (
                    <p className="font-mono text-xs text-muted-foreground">
                      @{freelancer.username}
                    </p>
                  )}

                  <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground mt-0.5">
                    <span>📍 {freelancer.location}</span>
                  </div>
                </div>
              </div>

              {isGrid && (
                <span
                  className={cn(
                    'status-tag text-[9px]',
                    isAvailable ? 'status-tag--positive' : 'status-tag--neutral'
                  )}
                >
                  {isAvailable ? 'AVAILABLE' : 'BUSY'}
                </span>
              )}
            </div>

            <p className="font-body text-xs font-medium text-foreground leading-snug line-clamp-2">
              {freelancer.headline}
            </p>

            {!isGrid && (
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span>{freelancer.experienceYears}+ Yrs Exp</span>
                <span>•</span>
                <span>{freelancer.completedProjects} Projects Done</span>
              </div>
            )}
          </motion.div>

          {/* Portfolio Thumbnail Preview Grid (Grid mode only) */}
          {isGrid && (
            <motion.div
              layout
              transition={springTransition}
              className="p-4 space-y-3"
            >
              <div className="font-mono text-[10px] uppercase text-muted-foreground flex items-center justify-between">
                <span>PORTFOLIO SNAPSHOT</span>
                <span>{freelancer.portfolio.length} WORKS</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
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

              <div className="flex flex-wrap gap-1 pt-1">
                {freelancer.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[9px] uppercase border border-border/80 bg-background px-2 py-0.5 text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer / Right Info Bar */}
        <motion.div
          layout
          transition={springTransition}
          className={cn(
            isGrid
              ? 'px-5 py-3 border-t border-border bg-background flex items-center justify-between font-mono text-xs'
              : 'flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-border/60 shrink-0'
          )}
        >
          <div
            className={cn(
              'space-y-0.5',
              !isGrid && 'text-left md:text-right font-mono text-xs'
            )}
          >
            <span className="text-muted-foreground text-[9px] uppercase block">
              Day Rate
            </span>
            <span className="font-bold text-foreground text-sm sm:text-base">
              {freelancer.dailyRate}
            </span>
            {!isGrid && (
              <div className="text-[10px] text-muted-foreground flex items-center md:justify-end gap-1">
                <Star className="w-3 h-3 fill-primary text-primary selection:text-background selection:bg-primary" />
                <span>
                  {freelancer.rating} ({freelancer.reviewCount})
                </span>
              </div>
            )}
          </div>

          {isGrid ? (
            <div className="flex items-center gap-1 font-mono text-xs">
              <Star className="w-3.5 h-3.5 fill-primary text-primary selection:text-background selection:bg-primary" />
              <span className="font-bold text-foreground">
                {freelancer.rating}
              </span>
              <span className="text-muted-foreground text-[10px]">
                ({freelancer.reviewCount})
              </span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-[10px] uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors h-10 px-4"
            >
              <span>View Profile Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
