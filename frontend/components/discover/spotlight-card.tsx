'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AvailabilityBadge } from './availability-badge';
import { cn } from '@/lib/cn';

interface SpotlightCardProps {
  href: string;
  image: string;
  imageAlt: string;
  isAvailable: boolean;
  badgeLabel: string;
  title: string;
  location: string;
  quote: string;
  metaRow: ReactNode;
  tags: string[];
  footerLabel: string;
  price: string;
  rating: number;
  reviewCount: number;
  ctaLabel: string;
  delay?: number;
  className?: string;
}

/**
 * Shared shell for both featured spotlight tiles (cult + freelancer).
 * Both variants render through this component so the structure — hero
 * image, badge, quote, meta row, tags, footer — can never drift apart.
 */
export function SpotlightCard({
  href,
  image,
  imageAlt,
  isAvailable,
  badgeLabel,
  title,
  location,
  quote,
  metaRow,
  tags,
  footerLabel,
  price,
  rating,
  reviewCount,
  ctaLabel,
  delay = 0,
  className,
}: SpotlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'group border border-border bg-card overflow-hidden flex flex-col hover:border-foreground transition-all cursor-pointer',
        className
      )}
    >
      <Link href={href} className="flex flex-col h-full">
        {/* Hero image */}
        <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden shrink-0">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground border-none font-mono text-[10px] uppercase tracking-widest px-3 py-1">
              {badgeLabel}
            </Badge>
          </div>

          <div className="absolute top-4 right-4">
            <AvailabilityBadge isAvailable={isAvailable} />
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {title}
              </h3>
              <span className="font-mono text-xs text-white/80 border border-white/30 px-2 py-0.5 uppercase">
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 flex flex-col flex-1">
          <blockquote className="font-editorial text-xl sm:text-2xl italic text-foreground leading-snug text-wrap-pretty">
            &ldquo;{quote}&rdquo;
          </blockquote>

          <div className="flex-1" />

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60">
            {metaRow}

            <div className="flex items-center gap-1 font-mono text-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="font-bold text-foreground">{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-wider border border-border/80 bg-background px-2 py-0.5 text-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-muted-foreground uppercase text-[9px] block">
                {footerLabel}
              </span>
              <span className="font-bold text-primary text-sm">{price}</span>
            </div>

            <Button
              variant="solid"
              size="sm"
              className="font-mono text-[10px] uppercase tracking-wider"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
