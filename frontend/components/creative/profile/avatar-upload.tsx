'use client';

import { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';
import { MAX_AVATAR_SIZE, ALLOWED_AVATAR_TYPES } from '@/constants';
import { useUpdateAvatar } from '@/hooks/creative/profile';

interface AvatarUploadProps {
  name: string;
  username: string;
  image?: string | null;
}

export default function AvatarUpload({
  name,
  username,
  image,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateAvatarMutation } = useUpdateAvatar();
  const isUploading = updateAvatarMutation.isPending;

  const handleButtonClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WebP image');
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    updateAvatarMutation.mutate(file);
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-11 flex flex-col items-center">
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isUploading}
        aria-busy={isUploading}
        className="group relative block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Change profile picture"
      >
        <Avatar className="size-24 rounded-2xl border-4 border-background shadow-sm transition-opacity group-focus-visible:opacity-90">
          <AvatarImage
            src={
              image ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
            }
            alt={name}
          />
          <AvatarFallback className="rounded-2xl text-4xl font-display">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span
          className={cn(
            'absolute -bottom-2 -right-2 z-10 flex size-7 items-center justify-center rounded-full bg-background shadow-md transition-transform duration-200 ease-out motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110 group-active:scale-95',
            isUploading && 'motion-safe:group-hover:scale-100'
          )}
        >
          {isUploading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Camera className="size-3.5" />
          )}
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
