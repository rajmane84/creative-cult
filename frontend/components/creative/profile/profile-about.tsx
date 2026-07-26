'use client';

import { useState } from 'react';
import { Edit2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditAboutDialog } from './edit-about-dialog';

interface ProfileAboutProps {
  headline: string;
  bio: string;
}

export default function ProfileAbout({ headline, bio }: ProfileAboutProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center justify-between gap-4 sticky top-8">
            <div className="font-mono text-xs uppercase tracking-widest opacity-60">
              / About
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="h-7 gap-1.5 -mr-2"
            >
              {bio ? (
                <>
                  <Edit2 className="size-3" />
                  Edit
                </>
              ) : (
                <>
                  <Plus className="size-3" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          {bio ? (
            <div className="font-editorial text-xl md:text-2xl lg:text-3xl leading-relaxed space-y-6 opacity-90">
              {bio.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50">
              Tell clients about yourself and your work
            </div>
          )}
        </div>
      </div>

      <EditAboutDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        headline={headline}
        bio={bio}
      />
    </div>
  );
}
