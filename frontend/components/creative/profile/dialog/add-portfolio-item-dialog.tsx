'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { ImagePlus, Loader2, Plus, X } from 'lucide-react';
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
import { cn } from '@/lib/cn';
import { useCreatePortfolioItem } from '@/hooks/creative/portfolio';
import Image from 'next/image';

interface AddPortfolioItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_COVER_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const EMPTY_FORM = {
  title: '',
  description: '',
  projectDate: '',
};

export function AddPortfolioItemDialog({
  open,
  onOpenChange,
}: AddPortfolioItemDialogProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setTags([]);
    setTagInput('');
    setCoverFile(null);
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setAttemptedSubmit(false);
  };

  const { createPortfolioItem, isCreating } = useCreatePortfolioItem({
    onSuccess: () => {
      onOpenChange(false);
      resetForm();
    },
  });

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    onOpenChange(next);
  };

  const applyCoverFile = (file: File) => {
    if (!ALLOWED_COVER_TYPES.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WebP image');
      return;
    }
    if (file.size > MAX_COVER_SIZE) {
      toast.error('Image must be smaller than 5MB');
      return;
    }
    setCoverFile(file);
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handleCoverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) applyCoverFile(file);
  };

  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyCoverFile(file);
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (value.length < 2) return;
    const isDuplicate = tags.some(
      (tag) => tag.toLowerCase() === value.toLowerCase()
    );
    if (isDuplicate) {
      setTagInput('');
      return;
    }
    setTags([...tags, value]);
    setTagInput('');
  };

  const isTitleValid = form.title.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTitleValid) {
      setAttemptedSubmit(true);
      return;
    }

    createPortfolioItem({
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      coverImageFile: coverFile || undefined,
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
              className={cn(
                'rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors',
                attemptedSubmit && !isTitleValid && 'border-destructive'
              )}
              autoFocus
            />
            {attemptedSubmit && !isTitleValid && (
              <p className="text-xs text-destructive">
                Add a title so clients know what this project is.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block">
              Cover Image
            </Label>

            {coverPreview ? (
              <div className="relative aspect-[16/9] border border-border overflow-hidden group">
                <Image
                  src={coverPreview}
                  alt="Cover preview"
                  className="absolute inset-0 size-full object-cover"
                  height={100}
                  width={100}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-sm"
                  onClick={handleRemoveCover}
                  aria-label="Remove cover image"
                  className="absolute top-2 right-2 bg-background/90"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingCover(true);
                }}
                onDragLeave={() => setIsDraggingCover(false)}
                onDrop={handleCoverDrop}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 aspect-[16/9] border border-dashed cursor-pointer transition-colors',
                  isDraggingCover
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/40'
                )}
              >
                <ImagePlus className="size-6 opacity-40" />
                <p className="font-mono text-[11px] uppercase tracking-wider opacity-60 text-center px-4">
                  Drag & drop, or click to upload
                </p>
                <p className="text-[10px] text-muted-foreground">
                  JPEG, PNG, or WebP · up to 5MB
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleCoverInputChange}
              className="hidden"
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
                    key={tag.toLowerCase()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-border bg-muted"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTags(
                          tags.filter(
                            (t) => t.toLowerCase() !== tag.toLowerCase()
                          )
                        )
                      }
                      className="opacity-50 hover:opacity-100 cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="pt-2 flex-col items-end gap-2 sm:flex-col">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating} className="gap-2">
                {isCreating && <Loader2 className="size-4 animate-spin" />}
                Add to Portfolio
              </Button>
            </div>
            {attemptedSubmit && !isTitleValid && (
              <p className="text-xs text-destructive">
                Title is required before this can be added.
              </p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
