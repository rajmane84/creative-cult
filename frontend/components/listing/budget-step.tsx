'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RateType, Currency, CURRENCY_LABELS, CURRENCY_SYMBOLS } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BudgetStepProps {
  rateType: RateType;
  onRateTypeChange: (value: RateType) => void;
  currency: Currency;
  onCurrencyChange: (value: Currency) => void;
  budgetMin: string;
  onBudgetMinChange: (value: string) => void;
  budgetMax: string;
  onBudgetMaxChange: (value: string) => void;
}

export default function BudgetStep({
  rateType,
  onRateTypeChange,
  currency,
  onCurrencyChange,
  budgetMin,
  onBudgetMinChange,
  budgetMax,
  onBudgetMaxChange,
}: BudgetStepProps) {
  return (
    <div className="space-y-8">
      <div className="mb-10 space-y-2">
        <h3 className="font-display text-4xl text-foreground leading-none tracking-normal">
          Budget & Compensation
        </h3>
        <p className="font-editorial text-lg text-foreground opacity-70">
          Set clear expectations for compensation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label
            htmlFor="rateType"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Rate Type
          </Label>
          <Select
            value={rateType}
            onValueChange={(value) => onRateTypeChange(value as RateType)}
          >
            <SelectTrigger id="rateType" className="w-full">
              <SelectValue placeholder="Select rate type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RateType.PROJECT}>Project Based</SelectItem>
              <SelectItem value={RateType.HOURLY}>Hourly Rate</SelectItem>
              <SelectItem value={RateType.DAILY}>Daily Rate</SelectItem>
              <SelectItem value={RateType.NEGOTIABLE}>Negotiable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label
            htmlFor="currency"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Currency
          </Label>
          <Select
            value={currency}
            onValueChange={(value) => onCurrencyChange(value as Currency)}
          >
            <SelectTrigger id="currency" className="w-full">
              <SelectValue placeholder="Select currency..." />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Currency).map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr} ({CURRENCY_SYMBOLS[curr]}) - {CURRENCY_LABELS[curr]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {rateType !== RateType.NEGOTIABLE && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label
              htmlFor="budgetMin"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
            >
              Minimum Budget
            </Label>
            <Input
              id="budgetMin"
              type="number"
              min={0}
              placeholder="e.g. 1000"
              value={budgetMin}
              onChange={(e) => onBudgetMinChange(e.target.value)}
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
            />
          </div>

          <div className="space-y-4">
            <Label
              htmlFor="budgetMax"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
            >
              Maximum Budget
            </Label>
            <Input
              id="budgetMax"
              type="number"
              min={0}
              placeholder="e.g. 5000"
              value={budgetMax}
              onChange={(e) => onBudgetMaxChange(e.target.value)}
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
}
