'use client';

import { useState } from 'react';
import { ImageIcon, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useMyPortfolio,
  useDeletePortfolioItem,
} from '@/hooks/creative/portfolio';
import { AddPortfolioItemDialog } from './dialog/add-portfolio-item-dialog';

export default function ProfilePortfolio() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { data: items, isLoading } = useMyPortfolio();
  const { deletePortfolioItem, isDeleting } = useDeletePortfolioItem();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    deletePortfolioItem(id, {
      onSettled: () => setPendingDeleteId(null),
    });
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
              onClick={() => setIsAddOpen(true)}
              className="h-7 gap-1.5 -mr-2"
            >
              <Plus className="size-3" />
              Add
            </Button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          {isLoading ? (
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
                  className="group relative border border-border bg-background animate-in fade-in duration-300 motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    {item.coverImageUrl ? (
                      <img
                        src={item.coverImageUrl}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
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
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 bg-background/90"
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
            <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50">
              <ImageIcon className="size-6 mx-auto mb-3 opacity-40" />
              Add your first project to build your portfolio
            </div>
          )}
        </div>
      </div>

      <AddPortfolioItemDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
