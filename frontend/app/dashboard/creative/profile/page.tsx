'use client';

import { Loader2 } from 'lucide-react';
import { useProfile } from '@/hooks/creative/profile/use-profile';
import {
  ProfileHeader,
  ProfileAbout,
  ProfileSkills,
  ProfileExperience,
  ProfileEducation,
  ProfilePortfolio,
} from '@/components/creative/profile';
import { EmailVerificationCard } from '@/components/auth/email-verification-card';

export default function CreativeProfilePage() {
  const { data: profileData, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="w-full bg-background min-h-[70vh] p-6 sm:p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary selection:text-background selection:bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Loading profile details...
          </span>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border pb-8">
          <h2 className="font-display text-4xl font-bold tracking-tight mb-4">
            Error loading profile
          </h2>
          <p className="font-editorial text-xl opacity-70">
            Failed to load your profile data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const { user, creativeProfile } = profileData.data;

  // Transform skills data to match component expectations
  const skills = creativeProfile.skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    level: skill.level ?? 'INTERMEDIATE',
  }));

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      <ProfileHeader
        user={{
          name: user.name,
          username: user.username || '',
          email: user.email,
          emailVerified: user.emailVerified ?? false,
          image: user.image ?? undefined,
        }}
        profile={{
          headline: creativeProfile.headline || '',
          bio: creativeProfile.bio || '',
          location: creativeProfile.location || 'Not specified',
          availability: creativeProfile.availability,
        }}
      />

      {/* Email Verification Section */}
      <EmailVerificationCard
        email={user.email}
        isVerified={user.emailVerified ?? false}
      />

      <div className="space-y-0">
        <ProfileAbout
          headline={creativeProfile.headline || ''}
          bio={creativeProfile.bio || ''}
        />
        <ProfileSkills skills={skills} />
        <ProfileExperience experiences={creativeProfile.experiences} />
        <ProfileEducation education={creativeProfile.education} />
        <ProfilePortfolio />
      </div>
    </div>
  );
}
