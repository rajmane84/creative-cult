'use client';

import { useState } from 'react';
import { MapPin, Mail, CheckCircle2, ShieldAlert } from 'lucide-react';
import AvailabilityToggle from './availability-toggle';
import { SetLocationDialog } from './dialog/set-location-dialog';
import { StatusTag } from './status-tag';
import AvatarUpload from './avatar-upload';
import CoverImageUpload from './cover-image-upload';
import { AvailabilityStatus } from '@/types';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { COVER_IMAGE_ASPECT_RATIO } from '@/constants';

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
    coverImage?: string | null;
  };
  onAvailabilityChange?: (status: AvailabilityStatus) => void;
}

export default function ProfileHeader({
  user,
  profile,
  onAvailabilityChange,
}: ProfileHeaderProps) {
  const [isSetLocationOpen, setIsSetLocationOpen] = useState(false);

  const handleEditProfile = () => {
    toast('Edit profile — coming soon');
  };

  const handleShareProfile = () => {
    toast('Share profile — coming soon');
  };

  return (
    <div>
      {/* Banner */}
      <div
        className="group relative w-full bg-muted"
        style={{ aspectRatio: COVER_IMAGE_ASPECT_RATIO }}
      >
        <CoverImageUpload coverImage={profile.coverImage} />

        {/* Availability toggle - hide on mobile, show on larger screens */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-6 hidden sm:block">
          <AvailabilityToggle
            currentStatus={profile.availability}
            onStatusChange={onAvailabilityChange}
            className="bg-background/95 backdrop-blur-sm"
          />
        </div>

        <AvatarUpload
          name={user.name}
          username={user.username}
          image={user.image}
        />
      </div>

      {/* Content below banner - centered */}
      <div className="flex flex-col items-center bg-background pt-8 pb-6 sm:pt-14 sm:pb-8 md:pt-16 md:pb-10 px-4 sm:px-10 md:px-12 text-center">
        {/* Mobile availability toggle - shown in content area on mobile only */}
        <div className="mb-4 sm:hidden">
          <AvailabilityToggle
            currentStatus={profile.availability}
            onStatusChange={onAvailabilityChange}
            className="bg-background/95 backdrop-blur-sm"
          />
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
          {user.name}
        </h1>
        <span className="mt-1 text-sm font-mono text-muted-foreground">
          @{user.username}
        </span>

        <p
          className={cn(
            'mt-3 text-sm sm:text-base md:text-lg font-body font-medium text-foreground max-w-2xl',
            !profile.headline && 'italic text-muted-foreground'
          )}
        >
          {profile.headline || 'Add a headline to introduce yourself'}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2">
          {profile.location ? (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 text-primary" />
              <span>{profile.location}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSetLocationOpen(true)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <MapPin className="size-3.5 text-primary" />
              Add location
            </button>
          )}

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="size-3.5 text-primary" />
            <span className="hidden sm:inline">{user.email}</span>
            <span className="sm:hidden">{user.email.split('@')[0]}@...</span>
          </div>

          {user.emailVerified ? (
            <StatusTag
              label="Verified"
              icon={CheckCircle2}
              variant="positive"
            />
          ) : (
            <StatusTag
              label="Not Verified"
              icon={ShieldAlert}
              variant="attention"
            />
          )}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant={'outline'}
            onClick={handleEditProfile}
            size={'sm'}
            className="w-full sm:w-auto"
          >
            Edit Profile
          </Button>
          <Button
            type="button"
            variant={'default'}
            onClick={handleShareProfile}
            size={'sm'}
            className="w-full sm:w-auto"
          >
            Share Profile
          </Button>
        </div>
      </div>

      <SetLocationDialog
        open={isSetLocationOpen}
        onOpenChange={setIsSetLocationOpen}
      />
    </div>
  );
}
