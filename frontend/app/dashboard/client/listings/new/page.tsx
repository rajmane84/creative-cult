'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreateListing } from '@/hooks/listing';
import {
  Discipline,
  DISCIPLINE_LABELS,
  LocationType,
  LOCATION_TYPE_LABELS,
  RateType,
  EmploymentType,
  Currency,
  ListingStatus,
} from '@/types';
import { toast } from 'sonner';

export default function NewListingPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ListingStatus>(ListingStatus.ACTIVE);
  const [locationType, setLocationType] = useState<LocationType>(
    LocationType.REMOTE
  );
  const [location, setLocation] = useState('');
  const [discipline, setDiscipline] = useState<Discipline | ''>('');
  const [employmentType, setEmploymentType] = useState<EmploymentType | ''>('');
  const [rateType, setRateType] = useState<RateType>(RateType.PROJECT);
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [budgetMin, setBudgetMin] = useState<string>('');
  const [budgetMax, setBudgetMax] = useState<string>('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const { createListingMutation } = useCreateListing({
    onSuccess: () => {
      toast.success('Listing created successfully!');
      router.push('/dashboard/client/listings');
    },
  });

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 20) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length < 5) {
      toast.error('Title must be at least 5 characters long');
      return;
    }
    if (description.length < 20) {
      toast.error('Description must be at least 20 characters long');
      return;
    }

    const min = budgetMin ? parseInt(budgetMin, 10) : undefined;
    const max = budgetMax ? parseInt(budgetMax, 10) : undefined;

    if (min !== undefined && max !== undefined && max < min) {
      toast.error(
        'Maximum budget must be greater than or equal to minimum budget'
      );
      return;
    }

    createListingMutation.mutate({
      title,
      description,
      status,
      locationType,
      location: location || undefined,
      discipline: discipline ? (discipline as Discipline) : undefined,
      employmentType: employmentType
        ? (employmentType as EmploymentType)
        : undefined,
      rateType,
      currency,
      budgetMin: min,
      budgetMax: max,
      duration: duration || undefined,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      skills: skills.length > 0 ? skills : undefined,
    });
  };

  return (
    <div className="w-full bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 border-b border-border pb-6">
          <Link
            href="/dashboard/client/listings"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Listings</span>
          </Link>

          <div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Create New{' '}
              <span className="text-primary selection:text-background selection:bg-primary">
                Listing
              </span>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Post an opportunity for top creatives to apply
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Details */}
          <div className="space-y-6 bg-card border border-border p-6 sm:p-8">
            <h2 className="font-editorial text-xl font-bold text-foreground">
              1. General Details
            </h2>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Brand Designer for Tech Rebrand"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                minLength={5}
                maxLength={100}
                required
              />
              <p className="text-[11px] text-muted-foreground font-mono">
                Min 5 characters, max 100 characters.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the scope of work, deliverables, and role requirements in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                minLength={20}
                maxLength={2000}
                required
              />
              <p className="text-[11px] text-muted-foreground font-mono">
                Min 20 characters, max 2000 characters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="discipline">Discipline</Label>
                <select
                  id="discipline"
                  className="w-full h-10 px-3 border border-input bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value as Discipline)}
                >
                  <option value="">Select discipline...</option>
                  {Object.entries(DISCIPLINE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <select
                  id="employmentType"
                  className="w-full h-10 px-3 border border-input bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                  value={employmentType}
                  onChange={(e) =>
                    setEmploymentType(e.target.value as EmploymentType)
                  }
                >
                  <option value="">Select type...</option>
                  <option value={EmploymentType.FREELANCE}>Freelance</option>
                  <option value={EmploymentType.FULL_TIME}>Full Time</option>
                  <option value={EmploymentType.PART_TIME}>Part Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Schedule */}
          <div className="space-y-6 bg-card border border-border p-6 sm:p-8">
            <h2 className="font-editorial text-xl font-bold text-foreground">
              2. Location & Schedule
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="locationType">Location Type</Label>
                <select
                  id="locationType"
                  className="w-full h-10 px-3 border border-input bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                  value={locationType}
                  onChange={(e) =>
                    setLocationType(e.target.value as LocationType)
                  }
                >
                  {Object.entries(LOCATION_TYPE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Specific Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA or Worldwide"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 2 months, 6 weeks"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Budget & Compensation */}
          <div className="space-y-6 bg-card border border-border p-6 sm:p-8">
            <h2 className="font-editorial text-xl font-bold text-foreground">
              3. Budget & Compensation
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rateType">Rate Type</Label>
                <select
                  id="rateType"
                  className="w-full h-10 px-3 border border-input bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                  value={rateType}
                  onChange={(e) => setRateType(e.target.value as RateType)}
                >
                  <option value={RateType.PROJECT}>Project Based</option>
                  <option value={RateType.HOURLY}>Hourly Rate</option>
                  <option value={RateType.DAILY}>Daily Rate</option>
                  <option value={RateType.NEGOTIABLE}>Negotiable</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  className="w-full h-10 px-3 border border-input bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
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
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Minimum Budget</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    min={0}
                    placeholder="e.g. 1000"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Maximum Budget</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    min={0}
                    placeholder="e.g. 5000"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Required Skills & Status */}
          <div className="space-y-6 bg-card border border-border p-6 sm:p-8">
            <h2 className="font-editorial text-xl font-bold text-foreground">
              4. Skills & Publication Status
            </h2>

            <div className="space-y-3">
              <Label htmlFor="skillInput">Required Skills</Label>
              <div className="flex gap-2">
                <Input
                  id="skillInput"
                  placeholder="e.g. Figma, After Effects, Brand Strategy"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSkill}
                  className="shrink-0 gap-1"
                >
                  <Plus className="size-4" />
                  <span>Add</span>
                </Button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted border border-border text-xs font-mono text-foreground"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <Label htmlFor="status">Listing Status</Label>
              <select
                id="status"
                className="w-full h-10 px-3 border border-input bg-background text-sm font-body rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                value={status}
                onChange={(e) => setStatus(e.target.value as ListingStatus)}
              >
                <option value={ListingStatus.ACTIVE}>
                  Active (Publish immediately)
                </option>
                <option value={ListingStatus.DRAFT}>
                  Draft (Save without publishing)
                </option>
              </select>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
            <Link href="/dashboard/client/listings">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={createListingMutation.isPending}
              className="gap-2"
            >
              {createListingMutation.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              <span>
                {status === ListingStatus.DRAFT
                  ? 'Save Draft'
                  : 'Publish Listing'}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
