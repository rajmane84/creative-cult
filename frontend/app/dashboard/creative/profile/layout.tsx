import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile — cre8ive-cult',
  description:
    'Manage your creative profile, portfolio, skills, and experience on cre8ive-cult.',
};

export default function CreativeProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
