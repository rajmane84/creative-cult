'use client';

import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MapPin,
  Mail,
  CheckCircle2,
  ShieldAlert,
  Camera,
  Loader2,
  Plus,
} from 'lucide-react';
import AvailabilityToggle from './availability-toggle';
import { EditLocationDialog } from './edit-location-dialog';
import { AvailabilityStatus } from '@/types';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

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
    bio: string;
    location: string;
    availability: AvailabilityStatus | string;
  };
  onAvailabilityChange?: (status: AvailabilityStatus) => void;
  onAvatarChange?: (file: File) => void;
  isAvatarUploading?: boolean;
}

export default function ProfileHeader({
  user,
  profile,
  onAvailabilityChange,
  onAvatarChange,
  isAvatarUploading,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLocationEditOpen, setIsLocationEditOpen] = useState(false);

  const handleAvatarButtonClick = () => {
    if (isAvatarUploading) return;
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WebP image');
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error('Image must be smaller than 2MB');
      return;
    }

    onAvatarChange?.(file);
  };

  return (
    <div className="pb-10 md:pb-14">
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Avatar - Left column */}
        <div className="col-span-12 md:col-span-3">
          <button
            type="button"
            onClick={handleAvatarButtonClick}
            disabled={isAvatarUploading || !onAvatarChange}
            aria-busy={isAvatarUploading}
            className={cn(
              'group relative block h-32 w-32 md:h-40 md:w-40 rounded-full',
              onAvatarChange &&
                'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full'
            )}
            aria-label="Change profile picture"
          >
            <Avatar
              className={cn(
                'h-32 w-32 md:h-40 md:w-40 border-2 border-border shadow-sm transition-opacity',
                onAvatarChange &&
                  'group-hover:opacity-90 group-focus-visible:opacity-90'
              )}
            >
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

            {onAvatarChange && (
              <span
                className={cn(
                  'absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 z-10 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background shadow-md transition-[transform,background-color] duration-200 ease-out motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110 group-hover:bg-primary/90 group-active:scale-95',
                  isAvatarUploading && 'motion-safe:group-hover:scale-100'
                )}
              >
                {isAvatarUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </span>
            )}
          </button>

          {onAvatarChange && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarFileChange}
              className="hidden"
            />
          )}
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
              <AvailabilityToggle
                currentStatus={profile.availability}
                onStatusChange={onAvailabilityChange}
              />
            </div>
          </div>

          {/* Headline - Editorial */}
          <p
            className={cn(
              'font-editorial text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-3xl',
              profile.headline ? 'opacity-90' : 'opacity-40 italic'
            )}
          >
            {profile.headline || 'Add a headline to introduce yourself'}
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-border/60">
            {profile.location ? (
              <button
                type="button"
                onClick={() => setIsLocationEditOpen(true)}
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-primary selection:text-background selection:bg-primary" />
                {profile.location}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsLocationEditOpen(true)}
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add location
              </button>
            )}

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

      <EditLocationDialog
        open={isLocationEditOpen}
        onOpenChange={setIsLocationEditOpen}
        location={profile.location}
      />
    </div>
  );
}
