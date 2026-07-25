'use client';

import Link from 'next/link';
import { CultDiscoverItem } from './mock-data';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  Users,
  Briefcase,
  Wrench,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Share2,
  Clock,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface CultDetailViewProps {
  cult: CultDiscoverItem;
}

export function CultDetailView({ cult }: CultDetailViewProps) {
  const isAvailable = cult.availability === 'AVAILABLE';

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      {/* Top Navigation & Breadcrumb Rail */}
      <div className="border-b border-border bg-card px-4 sm:px-6 md:px-10 lg:px-12 py-4 flex items-center justify-between font-mono text-xs uppercase tracking-wider">
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-primary selection:text-background selection:bg-primary group-hover:-translate-x-1 transition-transform" />
          <span>Back to Discover</span>
        </Link>

        <div className="flex items-center gap-2 text-muted-foreground">
          <span>/ DISCOVER</span>
          <span>/ CULT</span>
          <span className="text-foreground font-bold">/ #{cult.slug}</span>
        </div>
      </div>

      {/* Hero Banner Header */}
      <section className="relative w-full h-[45vh] min-h-[320px] max-h-[500px] overflow-hidden border-b border-border">
        <img
          src={cult.coverImage}
          alt={cult.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        {/* Hero Content Overlay */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 md:left-10 lg:left-12 right-4 sm:right-6 md:right-10 lg:right-12 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className="bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-3 py-1 border-none">
                CULT COLLECTIVE
              </Badge>

              {cult.isVerified && (
                <span className="status-tag status-tag--positive text-[10px] bg-background/90 text-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary selection:text-background selection:bg-primary" />
                  VERIFIED ESCROW COLLECTIVE
                </span>
              )}

              <span
                className={cn(
                  'status-tag text-[10px]',
                  isAvailable
                    ? 'status-tag--positive bg-background/90 text-foreground'
                    : 'status-tag--neutral bg-background/90 text-foreground'
                )}
              >
                {isAvailable ? 'AVAILABLE FOR BOOKING' : 'BUSY / BOOKING AHEAD'}
              </span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              {cult.name}
            </h1>

            <p className="font-editorial text-lg sm:text-xl text-white/90 max-w-3xl">
              {cult.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-white/90 shrink-0">
            <span>📍 {cult.location}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary selection:text-background selection:bg-primary" />
              <strong className="text-white font-bold">{cult.rating}</strong> (
              {cult.reviewCount} reviews)
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-10 w-full">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Details & Roster */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            {/* Bio & Manifesto */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border pb-2">
                <Sparkles className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
                <span>ABOUT & MANIFESTO</span>
              </div>
              <p className="font-editorial text-lg sm:text-xl text-foreground leading-relaxed">
                {cult.bio}
              </p>
            </div>

            {/* Active Cult Roster */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                  <Users className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
                  <span>
                    ACTIVE CULT ROSTER ({cult.members.length} CREATIVES)
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  SINGLE ESCROW INVOICE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cult.members.map((m) => (
                  <div
                    key={m.id}
                    className="border border-border bg-card p-4 flex items-center gap-3.5 hover:border-foreground transition-colors"
                  >
                    <Avatar className="w-12 h-12 border-2 border-border shrink-0">
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback className="font-mono text-xs font-bold">
                        {m.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-editorial text-base font-bold text-foreground truncate">
                        {m.name}
                      </h4>
                      <p className="font-mono text-[10px] text-primary selection:text-background selection:bg-primary uppercase font-bold truncate">
                        {m.role}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">
                        @{m.username}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Case Studies */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                  <Briefcase className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
                  <span>FEATURED CASE STUDIES ({cult.portfolio.length})</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {cult.portfolio.map((p) => (
                  <div
                    key={p.id}
                    className="group border border-border overflow-hidden bg-card hover:border-foreground transition-all"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider bg-background/90 border border-border px-2 py-0.5 text-foreground">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-editorial text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {p.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear & Production Tech */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border pb-2">
                <Wrench className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
                <span>GEAR & PRODUCTION TECH VAULT</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cult.equipment.map((eq) => (
                  <span
                    key={eq}
                    className="font-mono text-xs uppercase border border-border bg-card px-3.5 py-2 text-foreground flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Escrow & Booking Card */}
          <div className="col-span-12 lg:col-span-4 sticky top-20 space-y-6">
            <div className="border border-border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground border-b border-border pb-3">
                <span>PROJECT ESTIMATE & BOOKING</span>
                <Badge
                  variant="outline"
                  className="font-mono text-[9px] uppercase border-border"
                >
                  VERIFIED
                </Badge>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase block">
                  Starting Production Quote
                </span>
                <div className="font-display text-4xl text-primary selection:text-background selection:bg-primary">
                  {cult.startingPrice}
                </div>
                <span className="font-mono text-[10px] text-muted-foreground uppercase block">
                  One quote • Split among {cult.members.length} members
                </span>
              </div>

              {/* Stats Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-border font-mono text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary selection:text-background selection:bg-primary" />
                    Turnaround:
                  </span>
                  <span className="text-foreground font-bold">
                    {cult.turnaround}
                  </span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary selection:text-background selection:bg-primary" />
                    Completed Projects:
                  </span>
                  <span className="text-foreground font-bold">
                    {cult.completedProjects} Verified
                  </span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary selection:text-background selection:bg-primary" />
                    Client Rating:
                  </span>
                  <span className="text-foreground font-bold">
                    {cult.rating} / 5.0
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-border">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full font-mono text-xs uppercase tracking-wider h-12"
                >
                  <span>Request Cult Escrow Quote</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-mono text-xs uppercase tracking-wider h-11"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  <span>Share Cult Profile</span>
                </Button>
              </div>
            </div>

            {/* Escrow Banner */}
            <div className="border border-primary/40 bg-primary/5 p-5 flex items-start gap-4">
              <Lock className="w-6 h-6 text-primary selection:text-background selection:bg-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-foreground">
                  CREATIVE-CULT ESCROW GUARANTEE
                </h4>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Your payment is held securely in escrow and only released upon
                  milestone delivery. Protected by platform contracts & dispute
                  resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
