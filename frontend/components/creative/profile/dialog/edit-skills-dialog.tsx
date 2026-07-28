'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SkillsSection from '@/components/creative/onboarding/skills-section';
import { Skill } from '@/validations/creative/onboarding';
import { useUpdateSkills } from '@/hooks/creative/profile/use-update-skills';
import { SkillExpertiseLevel } from '@/types';

interface EditSkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills: Skill[];
}

export function EditSkillsDialog({
  open,
  onOpenChange,
  skills: initialSkills,
}: EditSkillsDialogProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);

  const { updateSkillsMutation } = useUpdateSkills({
    onSuccess: () => onOpenChange(false),
  });

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setSkills(initialSkills);
    }
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skills.length === 0) return;
    updateSkillsMutation.mutate({
      skills: skills.map((s) => ({
        name: s.name,
        expertise: s.expertise as SkillExpertiseLevel,
      })),
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
          <DialogDescription>
            Showcase your expertise to help clients find the right match.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-2">
          <SkillsSection skills={skills} onChange={setSkills} />

          <DialogFooter className="pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateSkillsMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateSkillsMutation.isPending || skills.length === 0}
              className="gap-2"
            >
              {updateSkillsMutation.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
