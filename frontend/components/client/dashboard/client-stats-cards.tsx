'use client';

import { Briefcase, Users, Heart, Clock } from 'lucide-react';
import {
  StatCard,
  StatCardHeader,
  StatCardIcon,
  StatCardTitle,
  StatCardBody,
  StatCardValue,
  StatCardSubtext,
} from '@/components/ui/stat-card';

export interface ClientStatsCardsProps {
  activeListings?: number;
  applicationsReceived?: number;
  savedCreatives?: number;
  avgTimeToFirstApp?: string;
}

export function ClientStatsCards({
  activeListings = 0,
  applicationsReceived = 0,
  savedCreatives = 0,
  avgTimeToFirstApp = '—',
}: ClientStatsCardsProps) {
  const stats = [
    {
      id: 'active-listings',
      title: 'Active Listings',
      value: activeListings,
      subtext:
        activeListings > 0
          ? `${activeListings} listing${activeListings > 1 ? 's' : ''} active`
          : 'No active listings yet',
      icon: Briefcase,
      delay: 0.1,
    },
    {
      id: 'applications-received',
      title: 'Applications Received',
      value: applicationsReceived,
      subtext:
        applicationsReceived > 0
          ? `${applicationsReceived} application${applicationsReceived > 1 ? 's' : ''} total`
          : 'No applications yet',
      icon: Users,
      delay: 0.2,
    },
    {
      id: 'saved-creatives',
      title: 'Saved Creatives',
      value: savedCreatives,
      subtext:
        savedCreatives > 0
          ? `${savedCreatives} creative${savedCreatives > 1 ? 's' : ''} saved`
          : 'No saved creatives yet',
      icon: Heart,
      delay: 0.3,
    },
    {
      id: 'avg-time-to-first-app',
      title: 'Avg. Time to First Application',
      value: avgTimeToFirstApp,
      subtext: 'Will show once you post',
      icon: Clock,
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} animationDelay={stat.delay}>
          <StatCardHeader>
            <StatCardIcon icon={stat.icon} />
            <StatCardTitle>{stat.title}</StatCardTitle>
          </StatCardHeader>

          <StatCardBody>
            <StatCardValue>{stat.value}</StatCardValue>
            <StatCardSubtext>{stat.subtext}</StatCardSubtext>
          </StatCardBody>
        </StatCard>
      ))}
    </div>
  );
}
