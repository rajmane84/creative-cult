'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CultDiscoverItem } from './mock-data';
import { ViewMode } from './discover-filters';
import { Users, ShieldCheck, Star, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface CultDiscoverCardProps {
  cult: CultDiscoverItem;
  viewMode: ViewMode;
  href?: string;
}

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

export function CultDiscoverCard({
  cult,
  viewMode,
  href,
}: CultDiscoverCardProps) {
  const isAvailable = cult.availability === 'AVAILABLE';
  const isGrid = viewMode === 'GRID';
  const targetHref = href || `/discover/cult/${cult.slug}`;

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
        {/* Top / Left Section */}
        <motion.div
          layout
          transition={springTransition}
          className={cn(
            'flex',
            isGrid ? 'flex-col w-full' : 'items-start md:items-center gap-4'
          )}
        >
          {/* Image Container */}
          <motion.div
            layout
            transition={springTransition}
            className={cn(
              'relative overflow-hidden border-border shrink-0',
              isGrid
                ? 'h-48 sm:h-52 w-full border-b'
                : 'w-24 h-24 sm:w-28 sm:h-28 border'
            )}
          >
            <img
              src={cult.coverImage}
              alt={cult.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {isGrid && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            )}

            {/* Badges on cover in Grid mode */}
            {isGrid ? (
              <>
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <Badge
                    variant="default"
                    className="bg-background text-foreground border border-border font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5"
                  >
                    CULT COLLECTIVE
                  </Badge>
                  <span
                    className={cn(
                      'status-tag text-[9px]',
                      isAvailable
                        ? 'status-tag--positive'
                        : 'status-tag--neutral'
                    )}
                  >
                    {isAvailable ? 'AVAILABLE NOW' : 'BOOKING AHEAD'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-[10px] uppercase">
                  <span>📍 {cult.location}</span>
                  {cult.isVerified && (
                    <span className="flex items-center gap-1 bg-background/90 text-foreground border border-border px-2 py-0.5">
                      <ShieldCheck className="w-3 h-3 text-primary selection:text-background selection:bg-primary" />
                      VERIFIED
                    </span>
                  )}
                </div>
              </>
            ) : (
              <span className="absolute top-1 left-1 font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-background border border-border text-foreground">
                CULT
              </span>
            )}
          </motion.div>

          {/* Content Info Area */}
          <motion.div
            layout
            transition={springTransition}
            className={cn(
              'space-y-2',
              isGrid ? 'p-5' : 'max-w-2xl space-y-1.5'
            )}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                <span>{cult.name}</span>
                {isGrid && (
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </h3>

              {!isGrid && cult.isVerified && (
                <span className="status-tag status-tag--positive text-[9px]">
                  <ShieldCheck className="w-3 h-3 text-primary selection:text-background selection:bg-primary" />
                  VERIFIED
                </span>
              )}
              {!isGrid && (
                <span className="font-mono text-xs text-muted-foreground">
                  📍 {cult.location}
                </span>
              )}
            </div>

            <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {cult.tagline}
            </p>

            {/* Member Roster Preview */}
            <div
              className={cn(
                'space-y-1.5',
                isGrid ? 'pt-2 border-t border-border/50' : 'pt-1'
              )}
            >
              {isGrid && (
                <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary selection:text-background selection:bg-primary" />
                    Active Roster ({cult.members.length})
                  </span>
                  <span>{cult.turnaround}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {cult.members.slice(0, 4).map((m) => (
                    <Avatar
                      key={m.id}
                      className={cn(
                        'border border-border',
                        isGrid ? 'w-7 h-7' : 'w-6 h-6'
                      )}
                    >
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback className="font-mono text-[8px]">
                        {m.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-muted-foreground truncate uppercase">
                  {isGrid
                    ? cult.members
                        .map((m) => m.role)
                        .slice(0, 2)
                        .join(' • ')
                    : `${cult.members.length} Members (${cult.members
                        .map((m) => m.role)
                        .slice(0, 2)
                        .join(', ')})`}
                </span>
              </div>
            </div>

            {/* Disciplines & Tags (Grid view only) */}
            {isGrid && (
              <div className="flex flex-wrap gap-1 pt-1">
                {cult.disciplines.map((d) => (
                  <span
                    key={d}
                    className="font-mono text-[9px] uppercase tracking-wider border border-border/80 bg-background px-2 py-0.5 text-foreground font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Footer / Right Rate & Actions */}
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
              Starting Price
            </span>
            <span className="font-bold text-primary selection:text-background selection:bg-primary text-sm sm:text-base">
              {cult.startingPrice}
            </span>
            {!isGrid && (
              <div className="text-[10px] text-muted-foreground flex items-center md:justify-end gap-1">
                <Star className="w-3 h-3 fill-primary text-primary selection:text-background selection:bg-primary" />
                <span>
                  {cult.rating} ({cult.reviewCount} reviews)
                </span>
              </div>
            )}
          </div>

          {isGrid ? (
            <div className="flex items-center gap-1 font-mono text-xs">
              <Star className="w-3.5 h-3.5 fill-primary text-primary selection:text-background selection:bg-primary" />
              <span className="font-bold text-foreground">{cult.rating}</span>
              <span className="text-muted-foreground text-[10px]">
                ({cult.completedProjects} done)
              </span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-[10px] uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors h-10 px-4"
            >
              <span>View Cult Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
