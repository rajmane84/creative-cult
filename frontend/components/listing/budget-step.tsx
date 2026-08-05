'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RateType, Currency } from '@/types';

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
          <select
            id="rateType"
            className="w-full h-10 px-3 border border-border bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            value={rateType}
            onChange={(e) => onRateTypeChange(e.target.value as RateType)}
          >
            <option value={RateType.PROJECT}>Project Based</option>
            <option value={RateType.HOURLY}>Hourly Rate</option>
            <option value={RateType.DAILY}>Daily Rate</option>
            <option value={RateType.NEGOTIABLE}>Negotiable</option>
          </select>
        </div>

        <div className="space-y-4">
          <Label
            htmlFor="currency"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Currency
          </Label>
          <select
            id="currency"
            className="w-full h-10 px-3 border border-border bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
          >
            <option value={Currency.USD}>USD ($)</option>
            <option value={Currency.EUR}>EUR (€)</option>
            <option value={Currency.GBP}>GBP (£)</option>
            <option value={Currency.INR}>INR (₹)</option>
            <option value={Currency.CAD}>CAD ($)</option>
            <option value={Currency.AUD}>AUD ($)</option>
          </select>
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
