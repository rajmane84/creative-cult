'use client';

import Link from 'next/link';
import { FreelancerDiscoverItem, formatRate, getRateLabel } from './mock-data';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  Briefcase,
  Wrench,
  Sparkles,
  CheckCircle2,
  Lock,
  Share2,
  Award,
  MessageSquare,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface FreelancerDetailViewProps {
  freelancer: FreelancerDiscoverItem;
}

export function FreelancerDetailView({
  freelancer,
}: FreelancerDetailViewProps) {
  const isAvailable = freelancer.availability === 'AVAILABLE';

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      {/* Top Navigation & Breadcrumb Rail */}
      <div className="border-b border-border bg-card px-4 sm:px-6 md:px-10 lg:px-12 py-4 flex items-center justify-between font-mono text-xs uppercase tracking-wider">
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-4 text-primary selection:text-background selection:bg-primary group-hover:-translate-x-1 transition-transform" />
          <span>Back to Discover</span>
        </Link>

        <div className="flex items-center gap-2 text-muted-foreground">
          <span>/ DISCOVER</span>
          <span>/ FREELANCER</span>
          <span className="text-foreground font-bold">
            / @{freelancer.username}
          </span>
        </div>
      </div>

      {/* Hero Cover & Profile Header */}
      <section className="relative w-full border-b border-border bg-background">
        <div className="h-48 sm:h-56 md:h-64 w-full overflow-hidden relative">
          <img
            src={freelancer.coverImage}
            alt={freelancer.name}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-8 -mt-16 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Avatar & Headline Info */}
            <div className="flex items-end gap-5">
              <Avatar className="size-24 sm:size-32 border-4 border-background bg-card shrink-0">
                <AvatarImage src={freelancer.avatarUrl} alt={freelancer.name} />
                <AvatarFallback className="font-mono text-2xl font-bold">
                  {freelancer.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    {freelancer.name}
                  </h1>

                  {freelancer.isVerified && (
                    <span className="status-tag status-tag--positive text-[10px]">
                      <ShieldCheck className="size-3.5 text-primary selection:text-background selection:bg-primary" />
                      VERIFIED CREATIVE
                    </span>
                  )}

                  <span
                    className={cn(
                      'status-tag text-[10px]',
                      isAvailable
                        ? 'status-tag--positive'
                        : 'status-tag--neutral'
                    )}
                  >
                    {isAvailable ? 'AVAILABLE NOW' : 'BUSY'}
                  </span>
                </div>

                <p className="font-mono text-sm text-muted-foreground">
                  @{freelancer.username} • 📍 {freelancer.location}
                </p>

                <p className="font-editorial text-base sm:text-lg font-medium text-foreground max-w-2xl pt-1">
                  {freelancer.headline}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground shrink-0 pb-1">
              <div className="flex items-center gap-1 border border-border px-3 py-1.5 bg-card">
                <Star className="size-4 fill-primary text-primary selection:text-background selection:bg-primary" />
                <strong className="text-foreground font-bold">
                  {freelancer.rating !== null ? freelancer.rating : 'New'}
                </strong>{' '}
                {freelancer.rating !== null && `(${freelancer.reviewCount})`}
              </div>

              <div className="border border-border px-3 py-1.5 bg-card">
                <strong className="text-foreground font-bold">
                  {freelancer.experienceYears}+ YRS
                </strong>{' '}
                EXP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-10 w-full">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Portfolio */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            {/* Bio Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border pb-2">
                <Sparkles className="size-4 text-primary selection:text-background selection:bg-primary" />
                <span>BIO & SPECIALIZATION</span>
              </div>
              <p className="font-editorial text-lg sm:text-xl text-foreground leading-relaxed">
                {freelancer.bio}
              </p>
            </div>

            {/* Skills & Disciplines Tags */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border pb-2">
                <Award className="size-4 text-primary selection:text-background selection:bg-primary" />
                <span>CORE SKILLS & DISCIPLINES</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs uppercase border border-border bg-card px-3 py-1.5 text-foreground font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio Works */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                  <Briefcase className="size-4 text-primary selection:text-background selection:bg-primary" />
                  <span>PORTFOLIO WORKS ({freelancer.portfolio.length})</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {freelancer.portfolio.map((p) => (
                  <div
                    key={p.id}
                    className="group border border-border overflow-hidden bg-card hover:border-foreground transition-all"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
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

            {/* Production Tools & Hardware */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground font-bold border-b border-border pb-2">
                <Wrench className="size-4 text-primary selection:text-background selection:bg-primary" />
                <span>HARDWARE & SOFTWARE STACK</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {freelancer.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs uppercase border border-border bg-card px-3.5 py-2 text-foreground flex items-center gap-2"
                  >
                    <CheckCircle2 className="size-4 text-primary selection:text-background selection:bg-primary" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hire & Rate Card */}
          <div className="col-span-12 lg:col-span-4 sticky top-20 space-y-6">
            <div className="border border-border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground border-b border-border pb-3">
                <span>RATES & BOOKING</span>
                <Badge
                  variant="outline"
                  className="font-mono text-[9px] uppercase border-border"
                >
                  DIRECT HIRE
                </Badge>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase block">
                  {getRateLabel(freelancer.rateType)}
                </span>
                <div className="font-display text-4xl text-foreground">
                  {formatRate(freelancer.rateType, freelancer.rateAmount)}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2.5 pt-4 border-t border-border font-mono text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Experience:</span>
                  <span className="text-foreground font-bold">
                    {freelancer.experienceYears} Years
                  </span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Completed Projects:</span>
                  <span className="text-foreground font-bold">
                    {freelancer.completedProjects} Verified
                  </span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Rating:</span>
                  <span className="text-foreground font-bold">
                    {freelancer.rating !== null
                      ? `${freelancer.rating} / 5.0`
                      : 'No reviews yet'}
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
                  <MessageSquare className="size-4 mr-2" />
                  <span>Hire / Send Brief</span>
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
                  <Share2 className="size-4 mr-2" />
                  <span>Share Profile</span>
                </Button>
              </div>
            </div>

            {/* Escrow Banner */}
            <div className="border border-primary/40 bg-primary/5 p-5 flex items-start gap-4">
              <Lock className="size-6 text-primary selection:text-background selection:bg-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-foreground">
                  ESCROW SAFEGUARD
                </h4>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Hire with confidence. All payments are locked in escrow and
                  released on final project approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
