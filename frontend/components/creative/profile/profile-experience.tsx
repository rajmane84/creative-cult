'use client';

import { useState } from 'react';
import { Briefcase, Edit2, Plus, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MonthPicker } from '@/components/ui/date-picker';
import { cn } from '@/lib/cn';
import { formatDateDDMMYYYY } from '@/lib/format-date';
import { EmploymentType } from '@/types';
import { useUpdateExperience } from '@/hooks/creative/profile';
import { handleApiError } from '@/lib/handle-error';

interface Experience {
  id: string;
  title: string;
  companyName?: string | null;
  employmentType: EmploymentType;
  industry?: string | null;
  startDate: string;
  endDate?: string | null;
  currentlyWorking: boolean;
  description?: string | null;
  skills: string[];
}

interface ProfileExperienceProps {
  experiences: Experience[];
}

const fromMonthInput = (value: string) => {
  if (!value) return null;
  const [year, month] = value.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1).toISOString();
};

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const formatEmploymentType = (type: string) => {
  return type
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

export default function ProfileExperience({
  experiences,
}: ProfileExperienceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { updateExperienceMutation } = useUpdateExperience();

  const formatDate = (dateString: string) => {
    return formatDateDDMMYYYY(dateString);
  };

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences
      .filter((exp) => exp.id !== id)
      .map((exp) => ({
        ...exp,
        companyName: exp.companyName ?? undefined,
        industry: exp.industry ?? undefined,
        endDate: exp.endDate ?? undefined,
        description: exp.description ?? undefined,
      }));
    updateExperienceMutation.mutate(
      { experiences: updatedExperiences },
      {
        onError: (error) => {
          handleApiError(error, 'Failed to delete experience');
        },
      }
    );
  };

  return (
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center justify-between gap-4 sticky top-8">
            <div className="font-mono text-xs uppercase tracking-widest opacity-60">
              / Experience
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
              ) : experiences.length > 0 ? (
                <>
                  <Edit2 className="size-3" />
                  Edit
                </>
              ) : (
                <>
                  <Plus className="size-3" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-12">
          {isEditing ? (
            <ExperienceFormSection
              experiences={experiences}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              onDelete={handleDelete}
            />
          ) : experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Date column */}
                  <div className="md:col-span-3">
                    <div className="font-mono text-xs uppercase tracking-wider opacity-60">
                      {formatDate(exp.startDate)} —{' '}
                      {exp.currentlyWorking
                        ? 'Present'
                        : exp.endDate
                          ? formatDate(exp.endDate)
                          : ''}
                    </div>
                  </div>

                  {/* Content column */}
                  <div className="md:col-span-9 space-y-4">
                    <div>
                      <h4 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-none">
                        {exp.title}
                      </h4>
                      <div className="font-mono text-sm uppercase tracking-wider opacity-70 mt-2">
                        {exp.companyName && (
                          <>
                            {exp.companyName}
                            <span className="mx-2 opacity-40">·</span>
                          </>
                        )}
                        {formatEmploymentType(exp.employmentType)}
                      </div>
                    </div>

                    {exp.description && (
                      <p className="font-editorial text-lg leading-relaxed opacity-80 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 text-xs font-mono uppercase tracking-wider border border-border bg-muted opacity-70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider between experiences */}
                {index !== experiences.length - 1 && (
                  <div className="mt-12 border-t border-border opacity-30" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50">
              <Briefcase className="size-6 mx-auto mb-3 opacity-40" />
              Add your work experience to build trust with clients
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Separate form section component for better organization
function ExperienceFormSection({
  experiences,
  isAdding,
  setIsAdding,
  onDelete,
}: {
  experiences: Experience[];
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const { updateExperienceMutation } = useUpdateExperience();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    employmentType: EmploymentType.FULL_TIME,
    industry: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
    skills: '',
  });
  const [dateError, setDateError] = useState<string | null>(null);

  const currentMonth = getCurrentMonth();

  const validateDates = (startDate: string, endDate: string) => {
    if (startDate && startDate > currentMonth) {
      return 'Start date cannot be in the future';
    }
    if (endDate && startDate && endDate < startDate) {
      return 'End date cannot be before the start date';
    }
    return null;
  };

  const handleSubmit = () => {
    const error = validateDates(
      formData.startDate,
      formData.currentlyWorking ? '' : formData.endDate
    );
    if (error) {
      setDateError(error);
      return;
    }

    const newExperience = {
      ...formData,
      skills: formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      startDate: fromMonthInput(formData.startDate) || new Date().toISOString(),
      endDate: formData.currentlyWorking
        ? undefined
        : (fromMonthInput(formData.endDate) ?? undefined),
    };

    const normalizedExperiences = experiences.map((exp) => ({
      ...exp,
      companyName: exp.companyName ?? undefined,
      industry: exp.industry ?? undefined,
      endDate: exp.endDate ?? undefined,
      description: exp.description ?? undefined,
    }));

    updateExperienceMutation.mutate(
      { experiences: [...normalizedExperiences, newExperience] },
      {
        onSuccess: () => {
          setFormData({
            title: '',
            companyName: '',
            employmentType: EmploymentType.FULL_TIME,
            industry: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            description: '',
            skills: '',
          });
          setDateError(null);
          setIsAdding(false);
        },
        onError: (error) => {
          handleApiError(error, 'Failed to add experience');
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
          Work Experience
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
              Add Experience
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Title <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="e.g., Senior Designer"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
              />
            </div>

            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Company <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="e.g., Acme Inc"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Employment Type <span className="text-red-600">*</span>
              </Label>
              <select
                value={formData.employmentType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employmentType: e.target.value as EmploymentType,
                  })
                }
                className="w-full h-10 px-3 rounded-none border border-border bg-background focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out font-mono text-[11px] uppercase tracking-widest"
              >
                {Object.values(EmploymentType).map((type) => (
                  <option key={type} value={type}>
                    {formatEmploymentType(type)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Industry <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="e.g., Technology"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Start Date <span className="text-red-600">*</span>
              </Label>
              <MonthPicker
                id="exp-start"
                max={currentMonth}
                value={formData.startDate}
                onChange={(startDate) => {
                  setFormData({ ...formData, startDate });
                  setDateError(
                    validateDates(
                      startDate,
                      formData.currentlyWorking ? '' : formData.endDate
                    )
                  );
                }}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                End Date
              </Label>
              <MonthPicker
                id="exp-end"
                min={formData.startDate || undefined}
                value={formData.endDate}
                disabled={formData.currentlyWorking}
                onChange={(endDate) => {
                  setFormData({ ...formData, endDate });
                  setDateError(validateDates(formData.startDate, endDate));
                }}
              />
            </div>
          </div>

          {dateError && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
              {dateError}
            </p>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={formData.currentlyWorking}
              onChange={(e) => {
                const currentlyWorking = e.target.checked;
                setFormData({ ...formData, currentlyWorking });
                setDateError(
                  validateDates(
                    formData.startDate,
                    currentlyWorking ? '' : formData.endDate
                  )
                );
              }}
              className="w-4 h-4 rounded border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
            />
            <Label
              htmlFor="currentlyWorking"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground"
            >
              Currently working here
            </Label>
          </div>

          <div className="space-y-4">
            <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
              Description
            </Label>
            <Textarea
              placeholder="Describe your role and achievements..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors duration-200 ease-out"
            />
          </div>

          <div className="space-y-4">
            <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
              Skills (comma-separated)
            </Label>
            <Input
              placeholder="e.g., React, TypeScript, Design"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
              disabled={updateExperienceMutation.isPending}
              className="flex-1 h-10 transition-all duration-200 ease-out hover:bg-muted/80 motion-reduce:transition-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                !formData.title ||
                !formData.companyName ||
                !formData.industry ||
                !formData.startDate ||
                !!dateError ||
                updateExperienceMutation.isPending
              }
              className="flex-1 h-10 gap-1.5 transition-all duration-200 ease-out hover:bg-primary/90 motion-reduce:transition-none"
            >
              {updateExperienceMutation.isPending ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>Add Experience</>
              )}
            </Button>
          </div>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative p-4 border border-border bg-background animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out transition-all duration-200 ease-out hover:shadow-sm motion-reduce:animate-none motion-reduce:transition-none"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-display text-lg font-bold">
                    {exp.title}
                  </h5>
                  <p className="font-mono text-sm opacity-70 mt-1">
                    {exp.companyName} ·{' '}
                    {formatEmploymentType(exp.employmentType)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onDelete(exp.id)}
                  disabled={updateExperienceMutation.isPending}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 ease-out hover:scale-110"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {experiences.length === 0 && !isAdding && (
        <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50 animate-in fade-in duration-500 ease-out motion-reduce:animate-none">
          <Briefcase className="size-6 mx-auto mb-3 opacity-40" />
          Add your work experience to build trust with clients
        </div>
      )}
    </div>
  );
}
