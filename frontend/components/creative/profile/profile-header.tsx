'use client';

import { useState } from 'react';
import {
  MapPin,
  Mail,
  CheckCircle2,
  ShieldAlert,
  Edit2,
  Loader2,
  X,
  Share2,
} from 'lucide-react';
import AvailabilityToggle from './availability-toggle';
import { SetLocationDialog } from './dialog/set-location-dialog';
import { StatusTag } from './status-tag';
import AvatarUpload from './avatar-upload';
import CoverImageUpload from './cover-image-upload';
import { AvailabilityStatus } from '@/types';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useUpdateProfile } from '@/hooks/creative/profile';
import { handleApiError } from '@/lib/handle-error';
import { COVER_IMAGE_ASPECT_RATIO } from '@/constants';
import { profileHeaderSchema } from '@/validations/creative/profile';

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
  const [isEditing, setIsEditing] = useState(false);
  const [localHeadline, setLocalHeadline] = useState(profile.headline);
  const [localBio, setLocalBio] = useState(profile.bio);
  const { updateProfileMutation } = useUpdateProfile();

  const handleEditProfile = () => {
    setLocalHeadline(profile.headline);
    setLocalBio(profile.bio);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validate the form data using Zod schema
    const validationResult = profileHeaderSchema.safeParse({
      headline: localHeadline || undefined,
      bio: localBio || undefined,
    });

    if (!validationResult.success) {
      // Display validation errors
      const errors = validationResult.error.flatten().fieldErrors;
      if (errors.headline) {
        toast.error(errors.headline[0]);
      } else if (errors.bio) {
        toast.error(errors.bio[0]);
      }
      return;
    }

    // Additional validation: headline minimum 2 chars if provided, bio minimum 10 chars if provided
    if (localHeadline && localHeadline.length < 2) {
      toast.error('Headline must be at least 2 characters');
      return;
    }
    if (localBio && localBio.length < 10) {
      toast.error('Bio must be at least 10 characters');
      return;
    }

    updateProfileMutation.mutate(
      { headline: localHeadline, bio: localBio },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success('Profile updated successfully');
        },
        onError: (error) => {
          handleApiError(error, 'Failed to update profile');
        },
      }
    );
  };

  const handleCancel = () => {
    setLocalHeadline(profile.headline);
    setLocalBio(profile.bio);
    setIsEditing(false);
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

        <AvatarUpload name={user.name} image={user.image} />
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

        {isEditing ? (
          <div
            className={cn(
              'mt-4 w-full max-w-2xl space-y-4 p-6 rounded-none border border-border bg-background',
              'animate-in fade-in slide-in-from-top-4 duration-300 ease-out',
              'transition-all duration-300 ease-out',
              'motion-reduce:animate-none motion-reduce:transition-none'
            )}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="headline"
                  className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
                >
                  Headline
                </Label>
                <span
                  className={cn(
                    'font-mono text-[10px]',
                    localHeadline.length >= 90
                      ? 'text-amber-600'
                      : 'text-muted-foreground',
                    localHeadline.length >= 100 ? 'text-red-600' : ''
                  )}
                >
                  {localHeadline.length}/100
                </span>
              </div>
              <Input
                id="headline"
                type="text"
                placeholder="e.g., Senior Graphic Designer"
                value={localHeadline}
                onChange={(e) => setLocalHeadline(e.target.value.slice(0, 100))}
                maxLength={100}
                className={cn(
                  'rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out',
                  localHeadline.length >= 100 &&
                    'border-red-500 focus-visible:border-red-500'
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="bio"
                  className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
                >
                  Bio
                </Label>
                <span
                  className={cn(
                    'font-mono text-[10px]',
                    localBio.length >= 450
                      ? 'text-amber-600'
                      : 'text-muted-foreground',
                    localBio.length >= 500 ? 'text-red-600' : ''
                  )}
                >
                  {localBio.length}/500
                </span>
              </div>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself and your work..."
                rows={4}
                value={localBio}
                onChange={(e) => setLocalBio(e.target.value.slice(0, 500))}
                maxLength={500}
                className={cn(
                  'rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors duration-200 ease-out',
                  localBio.length >= 500 &&
                    'border-red-500 focus-visible:border-red-500'
                )}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={updateProfileMutation.isPending}
                className="flex-1 h-10 transition-all duration-200 ease-out hover:bg-muted/80 motion-reduce:transition-none"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={
                  updateProfileMutation.isPending ||
                  (localHeadline.length > 0 && localHeadline.length < 2) ||
                  (localBio.length > 0 && localBio.length < 10)
                }
                className="flex-1 h-10 gap-1.5 transition-all duration-200 ease-out hover:bg-primary/90 motion-reduce:transition-none"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>Save Changes</>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p
              className={cn(
                'mt-3 text-sm sm:text-base md:text-lg font-body font-medium text-foreground max-w-2xl',
                !profile.headline && 'italic text-muted-foreground'
              )}
            >
              {profile.headline || 'Add a headline to introduce yourself'}
            </p>

            {profile.bio && (
              <div className="mt-4 font-editorial text-base sm:text-lg leading-relaxed opacity-90 max-w-2xl animate-in fade-in duration-500 ease-out motion-reduce:animate-none">
                {profile.bio.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </>
        )}

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
            onClick={isEditing ? handleCancel : handleEditProfile}
            size={'sm'}
            className="w-full sm:w-auto transition-all duration-200 ease-out hover:bg-muted/80 motion-reduce:transition-none"
          >
            {isEditing ? (
              <>
                <X className="size-3 mr-1.5" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 className="size-3 mr-1.5" />
                Edit Profile
              </>
            )}
          </Button>
          <Button
            type="button"
            variant={'default'}
            onClick={handleShareProfile}
            size={'sm'}
            className="w-full sm:w-auto"
          >
            <Share2 className="size-3 mr-1.5" />
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
