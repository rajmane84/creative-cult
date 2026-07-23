'use client';

import { useProfile } from '@/hooks/creative/profile/use-profile';
import {
  ProfileHeader,
  ProfileAbout,
  ProfileSkills,
} from '@/components/creative/profile';
import Loader from '@/components/loader';
import { EmailVerificationCard } from '@/components/auth/email-verification-card';

export default function CreativeProfilePage() {
  const { data: profileData, isLoading, error } = useProfile();

  if (isLoading) {
    return <Loader />;
  }

  if (error || !profileData) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
    <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
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
          location: creativeProfile.location || 'Not specified',
          availability: creativeProfile.availability,
        }}
      />

      {/* Email Verification Section */}
      <EmailVerificationCard
        email={user.email}
        isVerified={user.emailVerified ?? false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-8">
        {/* Main content column */}
        <div className="lg:col-span-8 space-y-0">
          <ProfileAbout bio={creativeProfile.bio || ''} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-12 space-y-12">
            <ProfileSkills skills={skills} />
          </div>
        </div>
      </div>
    </div>
  );
}
