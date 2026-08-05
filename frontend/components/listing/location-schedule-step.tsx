'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { LocationType, LOCATION_TYPE_LABELS } from '@/types';

interface LocationScheduleStepProps {
  locationType: LocationType;
  onLocationTypeChange: (value: LocationType) => void;
  location: string;
  onLocationChange: (value: string) => void;
  duration: string;
  onDurationChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  deadline: string;
  onDeadlineChange: (value: string) => void;
}

export default function LocationScheduleStep({
  locationType,
  onLocationTypeChange,
  location,
  onLocationChange,
  duration,
  onDurationChange,
  startDate,
  onStartDateChange,
  deadline,
  onDeadlineChange,
}: LocationScheduleStepProps) {
  const getTodayString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayString = getTodayString();

  return (
    <div className="space-y-8">
      <div className="mb-10 space-y-2">
        <h3 className="font-display text-4xl text-foreground leading-none tracking-normal">
          Location & Schedule
        </h3>
        <p className="font-editorial text-lg text-foreground opacity-70">
          Define where and when the work will happen
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label
            htmlFor="locationType"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Location Type
          </Label>
          <select
            id="locationType"
            className="w-full h-10 px-3 border border-border bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            value={locationType}
            onChange={(e) =>
              onLocationTypeChange(e.target.value as LocationType)
            }
          >
            {Object.entries(LOCATION_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <Label
            htmlFor="location"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Specific Location
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g. San Francisco, CA or Worldwide"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Label
            htmlFor="duration"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Duration
          </Label>
          <Input
            id="duration"
            type="text"
            placeholder="e.g. 2 months, 6 weeks"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
          />
        </div>

        <div className="space-y-4">
          <Label
            htmlFor="startDate"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Start Date
          </Label>
          <DatePicker
            id="startDate"
            min={deadline && deadline > todayString ? deadline : todayString}
            value={startDate}
            onChange={onStartDateChange}
            placeholder="DD/MM/YYYY"
          />
          <p className="font-mono text-[10px] text-muted-foreground">
            Must be today or in the future (DD/MM/YYYY)
          </p>
        </div>

        <div className="space-y-4">
          <Label
            htmlFor="deadline"
            className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
          >
            Application Deadline
          </Label>
          <DatePicker
            id="deadline"
            min={todayString}
            max={startDate || undefined}
            value={deadline}
            onChange={onDeadlineChange}
            placeholder="DD/MM/YYYY"
          />
          <p className="font-mono text-[10px] text-muted-foreground">
            Must be today or before start date (DD/MM/YYYY)
          </p>
        </div>
      </div>
    </div>
  );
}
