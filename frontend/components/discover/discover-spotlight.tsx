'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Star, ShieldCheck } from 'lucide-react';
import { MOCK_CULTS, MOCK_FREELANCERS } from './mock-data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function DiscoverSpotlight() {
  const featuredCult = MOCK_CULTS.find((c) => c.isFeatured) || MOCK_CULTS[0];
  const featuredFreelancer =
    MOCK_FREELANCERS.find((f) => f.isFeatured) || MOCK_FREELANCERS[0];

  return (
    <section className="border-b border-border bg-background/50 px-4 sm:px-6 md:px-10 lg:px-12 py-8 md:py-12 w-full">
      <div className="w-full space-y-6">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground font-bold">
            <Sparkles className="w-4 h-4 text-primary selection:text-background selection:bg-primary animate-pulse" />
            <span>SPOTLIGHT // HIGHLIGHTS OF THE MONTH</span>
          </div>

          <span className="font-mono text-[10px] uppercase text-muted-foreground hidden sm:inline-block">
            HANDPICKED COLLECTIVES & TALENT
          </span>
        </div>

        {/* Spotlight Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Featured Cult Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-8 group border border-border bg-card overflow-hidden flex flex-col justify-between hover:border-foreground transition-all cursor-pointer"
          >
            <Link
              href={`/discover/cult/${featuredCult.slug}`}
              className="flex flex-col h-full justify-between"
            >
              {/* Header image collage */}
              <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
                <img
                  src={featuredCult.coverImage}
                  alt={featuredCult.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badges on image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <Badge className="bg-primary text-primary-foreground border-none font-mono text-[10px] uppercase tracking-widest px-3 py-1 selection:text-background selection:bg-primary">
                    FEATURED CULT
                  </Badge>

                  <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary selection:text-background selection:bg-primary" />
                    <span>VERIFIED COLLECTIVE</span>
                  </div>
                </div>

                {/* Title & Tagline overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-white">
                      {featuredCult.name}
                    </h3>
                    <span className="font-mono text-xs text-white/80 border border-white/30 px-2 py-0.5 uppercase">
                      {featuredCult.location}
                    </span>
                  </div>
                  <p className="font-editorial text-sm sm:text-base text-white/90 line-clamp-1 max-w-xl">
                    {featuredCult.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom info section */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Quote Banner */}
                {featuredCult.featuredQuote && (
                  <p className="font-editorial text-sm sm:text-base italic text-foreground border-l-2 border-primary pl-3 py-0.5">
                    &ldquo;{featuredCult.featuredQuote}&rdquo;
                  </p>
                )}

                {/* Roster & Stats Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60">
                  {/* Member avatars */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {featuredCult.members.map((m) => (
                        <Avatar
                          key={m.id}
                          className="w-8 h-8 border border-border shrink-0"
                        >
                          <AvatarImage src={m.avatar} alt={m.name} />
                          <AvatarFallback className="font-mono text-[9px]">
                            {m.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {featuredCult.members.length} Visionaries
                    </span>
                  </div>

                  {/* Rating & Starting Rate */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 font-mono text-xs">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary selection:text-background selection:bg-primary" />
                      <span className="font-bold text-foreground">
                        {featuredCult.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({featuredCult.reviewCount})
                      </span>
                    </div>

                    <div className="font-mono text-xs text-right">
                      <span className="text-muted-foreground uppercase text-[10px] block">
                        Starting at
                      </span>
                      <span className="font-bold text-primary selection:text-background selection:bg-primary text-sm">
                        {featuredCult.startingPrice}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="font-mono text-[10px] uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                    >
                      <span>Inspect Cult</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Featured Freelancer Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-12 lg:col-span-4 group border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-foreground transition-all cursor-pointer"
          >
            <Link
              href={`/discover/freelancer/${featuredFreelancer.username}`}
              className="flex flex-col h-full justify-between space-y-4"
            >
              <div className="space-y-4">
                {/* Badge */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] uppercase tracking-wider border-border"
                  >
                    SOLO VISIONARY IN FOCUS
                  </Badge>

                  <span className="font-mono text-[10px] uppercase text-primary selection:text-background selection:bg-primary font-bold">
                    {featuredFreelancer.availability.replace('_', ' ')}
                  </span>
                </div>

                {/* Avatar & Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14 border-2 border-border shrink-0">
                    <AvatarImage
                      src={featuredFreelancer.avatarUrl}
                      alt={featuredFreelancer.name}
                    />
                    <AvatarFallback className="font-mono text-sm font-bold">
                      {featuredFreelancer.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h4 className="font-editorial text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {featuredFreelancer.name}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      @{featuredFreelancer.username}
                    </p>
                    <p className="font-body text-xs text-foreground font-medium line-clamp-2">
                      {featuredFreelancer.headline}
                    </p>
                  </div>
                </div>

                {/* Mini Portfolio Preview */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {featuredFreelancer.portfolio.slice(0, 2).map((p) => (
                    <div
                      key={p.id}
                      className="relative h-24 overflow-hidden border border-border"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-1 left-1 font-mono text-[8px] uppercase bg-background/90 border border-border px-1.5 py-0.5">
                        {p.category}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1">
                  {featuredFreelancer.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[9px] uppercase border border-border/80 bg-background px-2 py-0.5 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Rate & Action */}
              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-muted-foreground uppercase text-[9px] block">
                    Day Rate
                  </span>
                  <span className="font-bold text-foreground">
                    {featuredFreelancer.dailyRate}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono text-[10px] uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                >
                  <span>View Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
