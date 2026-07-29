import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile — cre8ive-cult',
  description:
    'Manage your client profile and business details on cre8ive-cult.',
};

export default function ClientProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
