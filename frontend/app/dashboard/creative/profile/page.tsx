import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import ProfileHeader from '@/components/creative/profile/profile-header';
import ProfileAbout from '@/components/creative/profile/profile-about';
import ProfileSkills from '@/components/creative/profile/profile-skills';
import ProfileExperience from '@/components/creative/profile/profile-experience';
import ProfileEducation from '@/components/creative/profile/profile-education';

export default async function CreativeProfilePage() {
  const session = await requireRole('CREATIVE');

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  // Double-check role for security
  if (user.role !== UserRole.CREATIVE) {
    redirect('/dashboard');
  }

  // Check if user has completed onboarding
  if (!user?.creativeProfile?.onboardingCompleted) {
    redirect('/onboarding/creative');
  }

  // Dummy data for the profile
  const dummyProfileData = {
    user: {
      name: 'Alex Designer',
      username: 'alexdesigner',
      email: 'alex@creativecult.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexdesigner',
    },
    profile: {
      headline: 'Senior UI/UX Designer & Frontend Developer',
      bio: "I'm a passionate multidisciplinary designer with over 8 years of experience creating digital products. I specialize in bridging the gap between design and engineering, ensuring beautiful interfaces are implemented with pixel perfection.\n\nWhen I'm not designing, I enjoy contributing to open-source projects, writing articles about design systems, and experimenting with new web technologies like WebGL and Three.js.",
      location: 'San Francisco, CA',
      availability: 'AVAILABLE',
    },
    skills: [
      { id: '1', name: 'Figma', level: 'EXPERT' },
      { id: '2', name: 'React', level: 'INTERMEDIATE' },
      { id: '3', name: 'Tailwind CSS', level: 'EXPERT' },
      { id: '4', name: 'UI Design', level: 'EXPERT' },
      { id: '5', name: 'TypeScript', level: 'INTERMEDIATE' },
      { id: '6', name: 'Motion Design', level: 'BEGINNER' },
    ],
    experiences: [
      {
        id: '1',
        title: 'Senior Product Designer',
        companyName: 'Acme Corp',
        employmentType: 'FULL_TIME',
        industry: 'Technology',
        startDate: '2021-03-01T00:00:00Z',
        endDate: null,
        currentlyWorking: true,
        description:
          'Leading the design of the core SaaS platform. Redesigned the entire component library and established a comprehensive design system used by 5 product teams.\n\nCollaborating closely with engineering and product management to define product strategy and roadmaps.',
        skills: [
          { name: 'Design Systems' },
          { name: 'Figma' },
          { name: 'React' },
        ],
      },
      {
        id: '2',
        title: 'UI/UX Designer',
        companyName: 'Creative Studio',
        employmentType: 'FULL_TIME',
        industry: 'Agency',
        startDate: '2018-06-01T00:00:00Z',
        endDate: '2021-02-28T00:00:00Z',
        currentlyWorking: false,
        description:
          'Delivered end-to-end design solutions for various clients ranging from early-stage startups to Fortune 500 companies. Conducted user research, created wireframes, and produced high-fidelity prototypes.',
        skills: [
          { name: 'UI Design' },
          { name: 'Prototyping' },
          { name: 'User Research' },
        ],
      },
    ],
    education: [
      {
        id: '1',
        school: 'Rhode Island School of Design',
        degree: 'BFA',
        fieldOfStudy: 'Graphic Design',
        country: 'USA',
        yearOfGraduation: '2018',
      },
    ],
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ProfileHeader
        user={dummyProfileData.user}
        profile={dummyProfileData.profile}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileAbout bio={dummyProfileData.profile.bio} />
          <ProfileExperience experiences={dummyProfileData.experiences} />
          <ProfileEducation education={dummyProfileData.education} />
        </div>

        <div className="space-y-6">
          <ProfileSkills skills={dummyProfileData.skills} />
        </div>
      </div>
    </div>
  );
}
