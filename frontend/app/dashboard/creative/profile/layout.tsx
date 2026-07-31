import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile — Atelier-Hub',
  description:
    'Manage your creative profile, portfolio, skills, and experience on Atelier-Hub.',
};

export default function CreativeProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
