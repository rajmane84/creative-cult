import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile — Atelier-Hub',
  description:
    'Manage your client profile and business details on Atelier-Hub.',
};

export default function ClientProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
