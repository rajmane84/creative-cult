'use client';

import { useState } from 'react';
import { ImageIcon, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/cn';
import {
  useMyPortfolio,
  useDeletePortfolioItem,
} from '@/hooks/creative/portfolio';

export default function ProfilePortfolio() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { data: items, isLoading } = useMyPortfolio();
  const { deletePortfolioItem, isDeleting } = useDeletePortfolioItem();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    coverImage: null as File | null,
  });

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    deletePortfolioItem(id, {
      onSettled: () => setPendingDeleteId(null),
    });
  };

  const handleAddPortfolio = () => {
    // This would need a proper portfolio upload hook
    // For now, we'll just show the inline editing UI pattern
    setIsAdding(false);
  };

  return (
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center justify-between gap-4 sticky top-8">
            <div className="font-mono text-xs uppercase tracking-widest opacity-60">
              / Portfolio
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsEditing(!isEditing);
                setIsAdding(false);
              }}
              className="h-7 gap-1.5 -mr-2 transition-all duration-200 ease-out hover:bg-muted/80 motion-reduce:transition-none"
            >
              {isEditing ? (
                <>Done</>
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
          {isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                  Portfolio Items
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAdding(!isAdding)}
                  className="h-8 gap-1.5 transition-colors duration-200 hover:bg-muted/80 motion-reduce:transition-none"
                >
                  {isAdding ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Plus className="size-3.5" />
                      Add Project
                    </>
                  )}
                </Button>
              </div>

              {isAdding && (
                <div
                  className={cn(
                    'space-y-4 p-6 rounded-none border border-border bg-background',
                    'animate-in fade-in slide-in-from-top-4 duration-300 ease-out',
                    'transition-all duration-300 ease-out',
                    'motion-reduce:animate-none motion-reduce:transition-none'
                  )}
                >
                  <div className="space-y-4">
                    <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                      Project Title *
                    </Label>
                    <Input
                      placeholder="e.g., Brand Identity Design"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                      Description
                    </Label>
                    <Textarea
                      placeholder="Describe your project..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors duration-200 ease-out"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                      Tags (comma-separated)
                    </Label>
                    <Input
                      placeholder="e.g., Branding, Identity, Design"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                      Cover Image
                    </Label>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coverImage: e.target.files?.[0] || null,
                        })
                      }
                      className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAdding(false)}
                      className="flex-1 h-10 transition-all duration-200 ease-out hover:bg-muted/80 motion-reduce:transition-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAddPortfolio}
                      disabled={!formData.title}
                      className="flex-1 h-10 gap-1.5 transition-all duration-200 ease-out hover:bg-primary/90 motion-reduce:transition-none"
                    >
                      Add Project
                    </Button>
                  </div>
                </div>
              )}

              {items && items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative border border-border bg-background animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out transition-all duration-200 ease-out hover:shadow-sm motion-reduce:animate-none motion-reduce:transition-none"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                        {item.coverImageUrl ? (
                          <img
                            src={item.coverImageUrl}
                            alt={item.title}
                            className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ImageIcon className="size-8 opacity-20" />
                          </div>
                        )}

                        <Button
                          type="button"
                          variant="secondary"
                          size="icon-sm"
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting && pendingDeleteId === item.id}
                          aria-label={`Remove ${item.title}`}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 ease-out bg-background/90 hover:scale-110"
                        >
                          {isDeleting && pendingDeleteId === item.id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="size-3.5" />
                          )}
                        </Button>
                      </div>

                      <div className="p-4 space-y-1.5">
                        <h5 className="font-display text-lg tracking-normal text-foreground leading-snug truncate">
                          {item.title}
                        </h5>
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono text-[10px] uppercase tracking-widest opacity-50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!items || items.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50 animate-in fade-in duration-500 ease-out motion-reduce:animate-none">
                  <ImageIcon className="size-6 mx-auto mb-3 opacity-40" />
                  Add your first project to build your portfolio
                </div>
              ) : null}
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] border border-border bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative border border-border bg-background animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out transition-all duration-200 ease-out hover:shadow-sm motion-reduce:animate-none motion-reduce:transition-none"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    {item.coverImageUrl ? (
                      <img
                        src={item.coverImageUrl}
                        alt={item.title}
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="size-8 opacity-20" />
                      </div>
                    )}

                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-sm"
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting && pendingDeleteId === item.id}
                      aria-label={`Remove ${item.title}`}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 ease-out bg-background/90 hover:scale-110"
                    >
                      {isDeleting && pendingDeleteId === item.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </Button>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h5 className="font-display text-lg tracking-normal text-foreground leading-snug truncate">
                      {item.title}
                    </h5>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] uppercase tracking-widest opacity-50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50 animate-in fade-in duration-500 ease-out motion-reduce:animate-none">
              <ImageIcon className="size-6 mx-auto mb-3 opacity-40" />
              Add your first project to build your portfolio
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
