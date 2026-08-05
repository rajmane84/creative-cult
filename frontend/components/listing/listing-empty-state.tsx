'use client';

import { motion } from 'motion/react';
import { Briefcase, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ease = [0.76, 0, 0.24, 1] as const;

interface ListingEmptyStateProps {
  onCreate?: () => void;
}

export function ListingEmptyState({ onCreate }: ListingEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="w-full py-16 sm:py-24"
    >
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        <div className="w-20 h-20 mx-auto border border-border bg-card flex items-center justify-center">
          <Briefcase className="size-8 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            No listings yet
          </h3>
          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-xs mx-auto">
            Create your first listing to start connecting with talented
            creatives.
          </p>
        </div>

        <div className="pt-4">
          {onCreate ? (
            <Button onClick={onCreate} className="gap-2 cursor-pointer">
              <Plus className="size-4" />
              <span>Create Your First Listing</span>
            </Button>
          ) : (
            <Link href="/dashboard/client/listings/new">
              <Button className="gap-2 cursor-pointer">
                <Plus className="size-4" />
                <span>Create Your First Listing</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
