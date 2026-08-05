'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Calendar,
  MapPin,
  DollarSign,
  Euro,
  PoundSterling,
  IndianRupee,
  JapaneseYen,
  Banknote,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  LISTING_STATUS_LABELS,
  LOCATION_TYPE_LABELS,
  RATE_TYPE_LABELS,
  CURRENCY_SYMBOLS,
} from '@/types';
import { ListingStatus, LocationType, RateType, Currency } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';

const ease = [0.76, 0, 0.24, 1] as const;

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    status: ListingStatus;
    locationType: LocationType;
    location?: string | null;
    budgetMin?: number | null;
    budgetMax?: number | null;
    rateType?: RateType | null;
    currency?: Currency | null;
    discipline?: string | null;
    skills: string[];
    deadline?: string | null;
    duration?: string | null;
    createdAt: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

const getCurrencyIcon = (currency?: Currency | null) => {
  switch (currency) {
    case Currency.EUR:
      return Euro;
    case Currency.GBP:
      return PoundSterling;
    case Currency.INR:
      return IndianRupee;
    case Currency.JPY:
    case Currency.CNY:
      return JapaneseYen;
    case Currency.USD:
    case Currency.CAD:
    case Currency.AUD:
    case Currency.MXN:
      return DollarSign;
    default:
      return Banknote;
  }
};

export function ListingCard({
  listing,
  onEdit,
  onDelete,
  onStatusChange,
}: ListingCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatBudget = () => {
    const currencySymbol =
      listing.currency && CURRENCY_SYMBOLS[listing.currency]
        ? CURRENCY_SYMBOLS[listing.currency]
        : '$';

    if (listing.rateType === RateType.NEGOTIABLE) {
      return 'Negotiable';
    }
    if (listing.budgetMin && listing.budgetMax) {
      return `${currencySymbol}${listing.budgetMin.toLocaleString()} - ${currencySymbol}${listing.budgetMax.toLocaleString()}`;
    }
    if (listing.budgetMin) {
      return `${currencySymbol}${listing.budgetMin.toLocaleString()}+`;
    }
    if (listing.budgetMax) {
      return `Up to ${currencySymbol}${listing.budgetMax.toLocaleString()}`;
    }
    return 'Budget not specified';
  };

  const getStatusVariant = (status: ListingStatus) => {
    switch (status) {
      case ListingStatus.ACTIVE:
        return 'status-tag--positive';
      case ListingStatus.DRAFT:
        return 'status-tag--neutral';
      case ListingStatus.CLOSED:
      case ListingStatus.ARCHIVED:
        return 'status-tag--neutral';
      case ListingStatus.FILLED:
        return 'status-tag--positive';
      default:
        return 'status-tag--neutral';
    }
  };

  const CurrencyIcon = getCurrencyIcon(listing.currency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease }}
      className="group w-full"
    >
      <div className="w-full border border-border bg-card hover:border-primary/50 transition-colors duration-300">
        {/* Card Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn('status-tag', getStatusVariant(listing.status))}
              >
                {LISTING_STATUS_LABELS[listing.status]}
              </span>
              {listing.discipline && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {listing.discipline.replace(/_/g, ' ')}
                </span>
              )}
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-foreground tracking-tight truncate group-hover:text-primary transition-colors selection:text-background selection:bg-primary">
              <Link href={`/dashboard/client/listings/${listing.id}`}>
                {listing.title}
              </Link>
            </h3>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
                'shrink-0 hover:bg-muted'
              )}
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit?.(listing.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange?.(listing.id, 'ACTIVE')}
              >
                Mark as Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange?.(listing.id, 'CLOSED')}
              >
                Close Listing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(listing.id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Description */}
          <p className="font-body text-sm text-muted-foreground line-clamp-2">
            {listing.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="size-4 text-muted-foreground shrink-0" />
              <span className="font-body text-foreground">
                {LOCATION_TYPE_LABELS[listing.locationType]}
                {listing.location && ` · ${listing.location}`}
              </span>
            </div>

            {/* Budget */}
            <div className="flex items-center gap-2 text-sm">
              <CurrencyIcon className="size-4 text-muted-foreground shrink-0" />
              <span className="font-body text-foreground">
                {formatBudget()}
                {listing.rateType &&
                  listing.rateType !== RateType.NEGOTIABLE && (
                    <span className="text-muted-foreground ml-1">
                      /{RATE_TYPE_LABELS[listing.rateType].toLowerCase()}
                    </span>
                  )}
              </span>
            </div>

            {/* Duration */}
            {listing.duration && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-muted-foreground shrink-0" />
                <span className="font-body text-foreground">
                  {listing.duration}
                </span>
              </div>
            )}

            {/* Deadline */}
            {listing.deadline && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="size-4 text-muted-foreground shrink-0" />
                <span className="font-body text-foreground">
                  {formatDate(listing.deadline)}
                </span>
              </div>
            )}
          </div>

          {/* Skills */}
          {listing.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {listing.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-border bg-background text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
              {listing.skills.length > 4 && (
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-border bg-background text-muted-foreground">
                  +{listing.skills.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Posted {formatDate(listing.createdAt)}
            </span>
            <Link href={`/dashboard/client/listings/${listing.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-[11px] uppercase tracking-widest hover:text-primary"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
