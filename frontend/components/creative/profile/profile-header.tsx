import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Mail, Edit2 } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    email: string;
    image?: string | null;
  };
  profile: {
    headline: string;
    location: string;
    availability: string;
  };
}

export default function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  return (
    <div className="border-b border-border pb-12 md:pb-16">
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Avatar - Left column */}
        <div className="col-span-12 md:col-span-3">
          <Avatar className="h-32 w-32 md:h-40 md:w-40">
            <AvatarImage
              src={
                user.image ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
              }
              alt={user.name}
            />
            <AvatarFallback className="text-4xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Main content - Right column */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* Top row: Name and Edit button */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-none selection:text-background selection:bg-primary">
                {user.name}
              </h1>
              <p className="font-mono text-xs uppercase tracking-widest opacity-50">
                @{user.username}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => alert('Edit button clicked!!')}
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          </div>

          {/* Headline - Editorial */}
          <p className="font-editorial text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl opacity-90">
            {profile.headline}
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-60">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-60">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 opacity-60" />
              <span
                className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border ${
                  profile.availability === 'AVAILABLE'
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : 'bg-muted text-muted-foreground border-border'
                }`}
              >
                {profile.availability === 'AVAILABLE'
                  ? 'Available for work'
                  : profile.availability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
