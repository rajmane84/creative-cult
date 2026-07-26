'use client';

import { useState } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreatePortfolioItem } from '@/hooks/creative/portfolio';

interface AddPortfolioItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EMPTY_FORM = {
  title: '',
  description: '',
  coverImageUrl: '',
  projectDate: '',
};

export function AddPortfolioItemDialog({
  open,
  onOpenChange,
}: AddPortfolioItemDialogProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const { createPortfolioItem, isCreating } = useCreatePortfolioItem({
    onSuccess: () => {
      onOpenChange(false);
      setForm(EMPTY_FORM);
      setTags([]);
      setTagInput('');
    },
  });

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setForm(EMPTY_FORM);
      setTags([]);
      setTagInput('');
    }
    onOpenChange(next);
  };

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (value.length < 2 || tags.includes(value)) return;
    setTags([...tags, value]);
    setTagInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    createPortfolioItem({
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      coverImageUrl: form.coverImageUrl.trim() || undefined,
      projectDate: form.projectDate || undefined,
      tags,
      ownerType: 'FREELANCER',
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Portfolio Item</DialogTitle>
          <DialogDescription>
            Showcase a project on your profile. It stays yours even if you later
            add it to a cult's shared work.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label
              htmlFor="pf-title"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Title *
            </Label>
            <Input
              id="pf-title"
              placeholder="e.g., Sangeet Night — The Mehta Wedding"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pf-cover"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Cover Image URL
            </Label>
            <Input
              id="pf-cover"
              type="url"
              placeholder="https://..."
              value={form.coverImageUrl}
              onChange={(e) =>
                setForm({ ...form, coverImageUrl: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pf-description"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Description
            </Label>
            <Textarea
              id="pf-description"
              placeholder="What was this project about?"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pf-date"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Project Date
            </Label>
            <Input
              id="pf-date"
              type="month"
              value={form.projectDate}
              onChange={(e) =>
                setForm({ ...form, projectDate: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors text-base md:text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="pf-tags"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block"
            >
              Tags
            </Label>
            <div className="flex gap-2">
              <Input
                id="pf-tags"
                placeholder="e.g., Wedding, Cinematic"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={handleAddTag}
                className="shrink-0 mt-1"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-border bg-muted"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="opacity-50 hover:opacity-100 cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || !form.title.trim()}
              className="gap-2"
            >
              {isCreating && <Loader2 className="size-4 animate-spin" />}
              Add to Portfolio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
