'use client';

import * as React from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** Parses a "YYYY-MM" value into its numeric parts. */
function parseMonthValue(value?: string) {
  if (!value) return null;
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) return null;
  return { year, month };
}

function toMonthValue(year: number, month: number) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function formatMonthValue(value?: string) {
  const parsed = parseMonthValue(value);
  if (!parsed) return '';
  return `${MONTH_LABELS[parsed.month - 1]} ${parsed.year}`;
}

interface MonthPickerProps {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  disabled?: boolean;
  'aria-invalid'?: boolean;
}

export function MonthPicker({
  id,
  value,
  onChange,
  min,
  max,
  placeholder = 'Select month',
  disabled,
  'aria-invalid': ariaInvalid,
}: MonthPickerProps) {
  const [open, setOpen] = React.useState(false);
  const selected = parseMonthValue(value);
  const [viewYear, setViewYear] = React.useState(
    () => selected?.year ?? new Date().getFullYear()
  );

  React.useEffect(() => {
    if (open) {
      setViewYear(selected?.year ?? new Date().getFullYear());
    }
  }, [open]);

  const minParsed = parseMonthValue(min);
  const maxParsed = parseMonthValue(max);

  const isMonthDisabled = (year: number, month: number) => {
    const candidate = toMonthValue(year, month);
    if (min && candidate < min) return true;
    if (max && candidate > max) return true;
    return false;
  };

  const isYearFullyDisabled = (year: number, direction: 'prev' | 'next') => {
    if (direction === 'prev' && minParsed && year < minParsed.year) return true;
    if (direction === 'next' && maxParsed && year > maxParsed.year) return true;
    return false;
  };

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger
        render={
          <button
            id={id}
            type="button"
            disabled={disabled}
            aria-invalid={ariaInvalid}
            className={cn(
              'group relative flex w-full min-w-0 items-center justify-between border-b-2 border-border py-2 text-left transition-colors',
              'focus-visible:outline-none has-focus-visible:border-primary',
              'aria-invalid:border-destructive',
              'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
        }
      >
        <span
          className={cn(
            'font-editorial text-xl tracking-tight md:text-2xl',
            !value && 'text-foreground/25'
          )}
        >
          {value ? formatMonthValue(value) : placeholder}
        </span>
        <CalendarIcon className="size-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-80" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        className="w-64 rounded-none border border-border bg-background p-3 shadow-xl ring-0"
      >
        <div className="flex items-center justify-between pb-3">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            disabled={isYearFullyDisabled(viewYear - 1, 'prev')}
            onClick={() => setViewYear((y) => y - 1)}
            aria-label="Previous year"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
            {viewYear}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            disabled={isYearFullyDisabled(viewYear + 1, 'next')}
            onClick={() => setViewYear((y) => y + 1)}
            aria-label="Next year"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {MONTH_LABELS.map((label, index) => {
            const month = index + 1;
            const isSelected =
              selected?.year === viewYear && selected?.month === month;
            const isDisabled = isMonthDisabled(viewYear, month);

            return (
              <Button
                key={label}
                type="button"
                variant={isSelected ? 'solid' : 'ghost'}
                size="sm"
                disabled={isDisabled}
                onClick={() => {
                  onChange(toMonthValue(viewYear, month));
                  setOpen(false);
                }}
                className="px-0"
              >
                {label}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function formatToDDMMYYYY(value?: string) {
  if (!value) return '';
  const dateOnly = value.split('T')[0];
  const parts = dateOnly.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return value;
}

interface DatePickerProps {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function DatePicker({
  id,
  value = '',
  onChange,
  min,
  max,
  placeholder = 'DD/MM/YYYY',
  disabled = false,
}: DatePickerProps) {
  const formattedDisplay = formatToDDMMYYYY(value);

  return (
    <div className="relative w-full group">
      <input
        id={id}
        type="date"
        min={min ? min.split('T')[0] : undefined}
        max={max ? max.split('T')[0] : undefined}
        value={value ? value.split('T')[0] : ''}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => {
          if (disabled) return;
          try {
            if ('showPicker' in e.currentTarget) {
              e.currentTarget.showPicker();
            }
          } catch {
            // Fallback for browsers that do not support showPicker
          }
        }}
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
      <div
        className={cn(
          'flex h-10 w-full items-center justify-between border border-border bg-background px-3 text-sm font-body transition-colors',
          'group-focus-within:border-primary group-hover:border-primary/60',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'font-mono text-sm tracking-wide',
            formattedDisplay ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {formattedDisplay || placeholder}
        </span>
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </div>
  );
}
