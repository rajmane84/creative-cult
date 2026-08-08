'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { ListingStatus } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SkillsStatusStepProps {
  skillInput: string;
  onSkillInputChange: (value: string) => void;
  skills: string[];
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
  status?: ListingStatus;
  onStatusChange?: (value: ListingStatus) => void;
  showStatusSelect?: boolean;
}

export default function SkillsStatusStep({
  skillInput,
  onSkillInputChange,
  skills,
  onAddSkill,
  onRemoveSkill,
  status,
  onStatusChange,
  showStatusSelect = true,
}: SkillsStatusStepProps) {
  return (
    <div className="space-y-8">
      <div className="mb-10 space-y-2">
        <h3 className="font-display text-4xl text-foreground leading-none tracking-normal">
          {showStatusSelect ? 'Skills & Publication' : 'Skills & Stack'}
        </h3>
        <p className="font-editorial text-lg text-foreground opacity-70">
          {showStatusSelect
            ? 'Add required skills and choose when to publish'
            : 'Specify the technical skills and tools required for this role'}
        </p>
      </div>

      <div className="space-y-4">
        <Label
          htmlFor="skillInput"
          className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
        >
          Required Skills
        </Label>
        <div className="flex gap-2">
          <Input
            id="skillInput"
            type="text"
            placeholder="e.g. Figma, After Effects, Brand Strategy"
            value={skillInput}
            onChange={(e) => onSkillInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onAddSkill();
              }
            }}
            className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
          />
          <Button
            type="button"
            variant="outline"
            onClick={onAddSkill}
            className="shrink-0 gap-1"
          >
            <Plus className="size-4" />
            <span>Add</span>
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted border border-border text-xs font-mono text-foreground"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => onRemoveSkill(skill)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {showStatusSelect && status && onStatusChange && (
        <div className="space-y-4 pt-6 border-t border-border">
          <Label
            htmlFor="status"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Listing Status
          </Label>
          <Select
            value={status}
            onValueChange={(value) => onStatusChange(value as ListingStatus)}
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Select status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ListingStatus.ACTIVE}>
                Active (Publish immediately)
              </SelectItem>
              <SelectItem value={ListingStatus.DRAFT}>
                Draft (Save without publishing)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
