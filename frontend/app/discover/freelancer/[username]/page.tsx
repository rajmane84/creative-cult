import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { FreelancerDetailView } from '@/components/discover';
import { discoverService } from '@/services/discover';

interface FreelancerPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({
  params,
}: FreelancerPageProps): Promise<Metadata> {
  const { username } = await params;
  const freelancer = await discoverService.getFreelancerByUsername(username);

  if (!freelancer) {
    return {
      title: 'Creative Not Found — Atelier-Hub',
    };
  }

  return {
    title: `${freelancer.name} (@${freelancer.username}) — Freelancer Profile | Atelier-Hub`,
    description: freelancer.headline || freelancer.bio,
  };
}

export default async function FreelancerDetailPage({
  params,
}: FreelancerPageProps) {
  const { username } = await params;
  const freelancer = await discoverService.getFreelancerByUsername(username);

  if (!freelancer) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-background pt-16">
      <Navbar />
      <FreelancerDetailView freelancer={freelancer} />
    </main>
  );
}
