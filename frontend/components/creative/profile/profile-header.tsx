'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Edit2, CheckCircle2, ShieldAlert } from 'lucide-react';
import AvailabilityToggle from './availability-toggle';
import { AvailabilityStatus } from '@/types';

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    email: string;
    emailVerified?: boolean;
    image?: string | null;
  };
  profile: {
    headline: string;
    location: string;
    availability: AvailabilityStatus | string;
  };
  onAvailabilityChange?: (status: AvailabilityStatus) => void;
}

export default function ProfileHeader({
  user,
  profile,
  onAvailabilityChange,
}: ProfileHeaderProps) {
  return (
    <div className="border-b border-border pb-10 md:pb-14">
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Avatar - Left column */}
        <div className="col-span-12 md:col-span-3">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-2 border-border shadow-sm">
            <AvatarImage
              src={
                user.image ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
              }
              alt={user.name}
            />
            <AvatarFallback className="text-4xl font-display">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Main content - Right column */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* Top row: Name, Username, Availability Toggle & Edit button */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none selection:text-background selection:bg-primary">
                  {user.name}
                </h1>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-50">
                @{user.username}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 font-mono text-xs uppercase tracking-wider"
                onClick={() => alert('Edit profile functionality')}
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
              <AvailabilityToggle
                currentStatus={profile.availability}
                onStatusChange={onAvailabilityChange}
              />
            </div>
          </div>

          {/* Headline - Editorial */}
          <p className="font-editorial text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-3xl opacity-90">
            {profile.headline}
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-border/60">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-70">
              <MapPin className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
              {profile.location}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-80">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{user.email}</span>

              {/* Inline Email Verification Status Badge */}
              {user.emailVerified ? (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                  title="Email is verified"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/30"
                  title="Email is not verified"
                >
                  <ShieldAlert className="w-3 h-3" />
                  Not Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
