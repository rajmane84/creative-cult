export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/session';
import { ROLE_ROUTES } from '@/constants';
import { RoleSelectionWrapper } from '@/components/auth/role-selection-wrapper';
import {
  Hero,
  MarqueeStrip,
  Navbar,
  Duality,
  Manifesto,
  CaseStudy,
  Escrow,
  Waitlist,
  Footer,
} from '@/components/landing';

export default async function HomePage() {
  const session = await verifySession();

  // If user is authenticated with a role, redirect to their dashboard
  if (session && session.user?.role && ROLE_ROUTES[session.user.role]) {
    redirect(ROLE_ROUTES[session.user.role]);
  }

  // If user is authenticated but has no role, show role selection
  if (session && !session.user?.role) {
    return <RoleSelectionWrapper />;
  }

  // Show landing page for unauthenticated users
  return (
    <main className="relative w-full\">
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Duality />
      <Manifesto />
      <CaseStudy />
      <Escrow />
      <Waitlist />
      <Footer />
    </main>
  );
}
