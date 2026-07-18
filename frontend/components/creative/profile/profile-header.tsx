import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Mail, Edit2 } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    email: string;
    image?: string;
  };
  profile: {
    headline: string;
    location: string;
    availability: string;
  };
}

export default function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-sm">
          <AvatarImage
            src={
              user.image ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
            }
            alt={user.name}
          />
          <AvatarFallback className="text-2xl">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                @{user.username}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          <p className="text-lg text-slate-800 dark:text-slate-200 font-medium">
            {profile.headline}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-600 dark:text-slate-400 mt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {profile.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <Badge
                variant="secondary"
                className="font-normal bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {profile.availability === 'AVAILABLE'
                  ? 'Available for work'
                  : profile.availability}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-400" />
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
