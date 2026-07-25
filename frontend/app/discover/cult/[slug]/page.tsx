import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { CultDetailView, getCultBySlug } from '@/components/discover';

interface CultPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CultPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cult = getCultBySlug(slug);

  if (!cult) {
    return {
      title: 'Cult Not Found — cre8ive-cult',
    };
  }

  return {
    title: `${cult.name} — Cult Collective | cre8ive-cult`,
    description: cult.tagline || cult.bio,
  };
}

export default async function CultDetailPage({ params }: CultPageProps) {
  const { slug } = await params;
  const cult = getCultBySlug(slug);

  if (!cult) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-background pt-16">
      <Navbar />
      <CultDetailView cult={cult} />
    </main>
  );
}
