'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Users, Crown, ArrowUpRight, User } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';
import type { Cult } from '@/types/creative/cult';

interface CultCardProps {
  cult: Cult;
  href?: string;
}

const MotionLink = motion.create(Link);

export function CultCard({ cult, href }: CultCardProps) {
  const isLeader = cult.userRole === 'LEADER';
  const targetHref = href || `/dashboard/creative/cult/${cult.slug}`;

  return (
    <MotionLink
      href={targetHref}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between border border-border bg-card p-6 md:p-7 transition-colors hover:border-foreground cursor-pointer"
    >
      <div className="space-y-4">
        {/* Role Badge */}
        <div className="flex items-center justify-between">
          <Badge
            className={cn(
              'px-3 py-1 font-mono text-[10px] uppercase tracking-wider rounded-full border',
              isLeader
                ? 'border-primary/40 bg-primary/10 text-primary selection:text-background selection:bg-primary font-semibold'
                : 'border-border bg-muted text-muted-foreground'
            )}
          >
            {isLeader ? (
              <Crown className="size-3 mr-1" />
            ) : (
              <User className="size-3 mr-1" />
            )}
            {isLeader ? 'Leader' : 'Member'}
          </Badge>

          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            ID: #{cult.slug}
          </span>
        </div>

        {/* Cult Details */}
        <div className="space-y-1.5 pt-1">
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight duration-200 text-foreground group-hover:text-primary group-hover:selection:text-background group-hover:selection:bg-primary transition-colors flex items-center justify-between">
            <span>{cult.name}</span>
            {/* <ArrowUpRight className="size-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary selection:text-background selection:bg-primary" /> */}
          </h3>

          {cult.tagline && (
            <p className="font-body text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {cult.tagline}
            </p>
          )}
        </div>

        {/* Tags */}
        {cult.tags && cult.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {cult.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-wider border border-border/60 bg-background px-2 py-0.5 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
          <Users className="size-4 text-primary selection:text-background selection:bg-primary" />
          <span className="font-mono text-xs font-medium text-foreground">
            {cult.memberCount} {cult.memberCount === 1 ? 'member' : 'members'}
          </span>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground group-hover:text-primary group-hover:selection:text-background group-hover:selection:bg-primary transition-colors flex items-center gap-1">
          <span>View details</span>
          <ArrowUpRight className="size-3" />
        </span>
      </div>
    </MotionLink>
  );
}
