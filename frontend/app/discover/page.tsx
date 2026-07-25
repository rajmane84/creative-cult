import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { DiscoverView } from '@/components/discover';

export const metadata: Metadata = {
  title: 'Discover Cults & Freelancers — cre8ive-cult',
  description:
    'Explore vetted creative collectives (Cults) and independent visionaries. Book unified multi-disciplinary teams with guaranteed escrow protection.',
};

export default function DiscoverPage() {
  return (
    <main className="relative min-h-screen bg-background pt-16">
      <Navbar />
      <DiscoverView />
    </main>
  );
}
