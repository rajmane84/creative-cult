'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MonthPicker } from '@/components/ui/date-picker';
import {
  X,
  Plus,
  Briefcase,
  ChevronDown,
  Edit2,
  Calendar,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { EmploymentType } from '@/types';
import {
  Experience,
  experienceSchema,
} from '@/validations/creative/experience';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExperienceFormSectionProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  error?: string;
}

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  [EmploymentType.FULL_TIME]: 'Full-Time',
  [EmploymentType.PART_TIME]: 'Part-Time',
  [EmploymentType.FREELANCE]: 'Freelance',
  [EmploymentType.SELF_EMPLOYED]: 'Self-Employed',
};

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const EMPTY_FORM: Experience = {
  title: '',
  employmentType: EmploymentType.FULL_TIME,
  companyName: '',
  industry: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  description: '',
  skills: [],
};

export default function ExperienceFormSection({
  experiences,
  onChange,
  error,
}: ExperienceFormSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState<Experience>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const currentMonth = getCurrentMonth();

  const validateDates = (startDate?: string, endDate?: string) => {
    if (startDate && startDate > currentMonth) {
      return 'Start date cannot be in the future';
    }
    if (endDate && startDate && endDate < startDate) {
      return 'End date cannot be before the start date';
    }
    return undefined;
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setFormErrors({});
    setSkillInput('');
    setIsDropdownOpen(false);
  };

  const handleToggleAdd = () => {
    if (isAdding || editingIndex !== null) {
      setIsAdding(false);
      setEditingIndex(null);
      resetForm();
    } else {
      resetForm();
      setIsAdding(true);
    }
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(experiences[index]);
    setFormErrors({});
    setIsDropdownOpen(false);
    setIsAdding(true);
  };

  const handleRemove = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    onChange(updated);
    if (editingIndex === index) {
      setIsAdding(false);
      setEditingIndex(null);
      resetForm();
    }
  };

  const handleAddSkillTag = () => {
    const value = skillInput.trim();
    if (value.length < 2 || formData.skills.includes(value)) return;
    setFormData({ ...formData, skills: [...formData.skills, value] });
    setSkillInput('');
  };

  const handleRemoveSkillTag = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSave = () => {
    const payload = {
      ...formData,
      endDate: formData.currentlyWorking ? undefined : formData.endDate,
    };
    const parseResult = experienceSchema.safeParse(payload);

    if (!parseResult.success) {
      const errors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as string] = issue.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    const dateError = validateDates(payload.startDate, payload.endDate);
    if (dateError) {
      setFormErrors((prev) => ({ ...prev, endDate: dateError }));
      return;
    }

    if (editingIndex !== null) {
      const updated = [...experiences];
      updated[editingIndex] = parseResult.data;
      onChange(updated);
    } else {
      onChange([...experiences, parseResult.data]);
    }

    setIsAdding(false);
    setEditingIndex(null);
    resetForm();
  };

  const formatMonth = (value?: string) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
          Experience
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleToggleAdd}
          className="h-8 gap-1.5 transition-colors duration-200 hover:bg-muted/80 motion-reduce:transition-none"
        >
          {isAdding || editingIndex !== null ? (
            <>Cancel</>
          ) : (
            <>
              <Plus className="size-3.5" />
              Add Experience
            </>
          )}
        </Button>
      </div>

      {(isAdding || editingIndex !== null) && (
        <div
          className={cn(
            'space-y-4 p-6 rounded-none border border-border bg-background',
            'animate-in fade-in duration-300',
            'transition-all duration-300',
            'motion-reduce:animate-none motion-reduce:transition-none'
          )}
        >
          <div className="space-y-2 min-w-0">
            <Label
              htmlFor="exp-title"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
            >
              Title <span className="text-red-600">*</span>
            </Label>
            <Input
              id="exp-title"
              type="text"
              placeholder="e.g., Senior Motion Designer"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              autoFocus
            />
            {formErrors.title && (
              <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                {formErrors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="exp-company"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                Company
              </Label>
              <Input
                id="exp-company"
                type="text"
                placeholder="e.g., Studio Nine"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="exp-employment-type"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                Employment Type <span className="text-red-600">*</span>
              </Label>
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <DropdownMenuTrigger className="flex w-full items-center justify-between h-10 px-3 py-2 rounded-none border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-0">
                  <span className="truncate">
                    {EMPLOYMENT_TYPE_LABELS[formData.employmentType]}
                  </span>
                  <ChevronDown className="size-3.5 opacity-60 shrink-0 ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  data-lenis-prevent
                  onWheel={(e) => e.stopPropagation()}
                  className="w-[var(--anchor-width)] rounded-none border border-border bg-background shadow-xl z-[100] p-1"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuRadioGroup
                      value={formData.employmentType}
                      onValueChange={(val) => {
                        if (val) {
                          setFormData({
                            ...formData,
                            employmentType: val as EmploymentType,
                          });
                          setIsDropdownOpen(false);
                        }
                      }}
                    >
                      {Object.entries(EMPLOYMENT_TYPE_LABELS).map(
                        ([key, label]) => (
                          <DropdownMenuRadioItem
                            key={key}
                            value={key}
                            onClick={() => setIsDropdownOpen(false)}
                            className="font-sans text-sm py-2 px-3 rounded-none cursor-pointer focus:bg-muted focus:text-foreground"
                          >
                            {label}
                          </DropdownMenuRadioItem>
                        )
                      )}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-2 min-w-0">
            <Label
              htmlFor="exp-industry"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
            >
              Industry
            </Label>
            <Input
              id="exp-industry"
              type="text"
              placeholder="e.g., Advertising, Film, Product Design"
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="exp-start"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                Start Date <span className="text-red-600">*</span>
              </Label>
              <MonthPicker
                id="exp-start"
                max={currentMonth}
                value={formData.startDate}
                onChange={(startDate) => {
                  setFormData({ ...formData, startDate });
                  setFormErrors((prev) => {
                    const rest = { ...prev };
                    delete rest.startDate;
                    delete rest.endDate;
                    const dateError = validateDates(
                      startDate,
                      formData.currentlyWorking ? undefined : formData.endDate
                    );
                    return dateError ? { ...rest, endDate: dateError } : rest;
                  });
                }}
              />
              {formErrors.startDate && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                  {formErrors.startDate}
                </p>
              )}
            </div>

            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="exp-end"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                End Date
              </Label>
              <MonthPicker
                id="exp-end"
                min={formData.startDate || undefined}
                value={formData.endDate}
                disabled={formData.currentlyWorking}
                onChange={(endDate) => {
                  setFormData({ ...formData, endDate });
                  const dateError = validateDates(formData.startDate, endDate);
                  setFormErrors((prev) => {
                    const rest = { ...prev };
                    delete rest.endDate;
                    return dateError ? { ...rest, endDate: dateError } : rest;
                  });
                }}
              />
              {formErrors.endDate && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                  {formErrors.endDate}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const currentlyWorking = !formData.currentlyWorking;
              setFormData({ ...formData, currentlyWorking });
              const dateError = validateDates(
                formData.startDate,
                currentlyWorking ? undefined : formData.endDate
              );
              setFormErrors((prev) => {
                const { ...rest } = prev;
                return dateError ? { ...rest, endDate: dateError } : rest;
              });
            }}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border transition-colors duration-300 cursor-pointer',
              formData.currentlyWorking
                ? 'bg-blue-100 text-blue-700 border-blue-200'
                : 'bg-background text-foreground border-border hover:bg-muted/80'
            )}
          >
            <span
              className={cn(
                'size-3.5 border flex items-center justify-center shrink-0',
                formData.currentlyWorking
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-border'
              )}
            >
              {formData.currentlyWorking && (
                <span className="size-1.5 bg-white" />
              )}
            </span>
            I currently work here
          </button>

          <div className="space-y-2 min-w-0">
            <Label
              htmlFor="exp-description"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
            >
              Description
            </Label>
            <Textarea
              id="exp-description"
              placeholder="What did you work on?"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors"
            />
          </div>

          <div className="space-y-2 min-w-0">
            <Label
              htmlFor="exp-skills"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
            >
              Skills Used
            </Label>
            <div className="flex gap-2">
              <Input
                id="exp-skills"
                type="text"
                placeholder="e.g., After Effects"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkillTag();
                  }
                }}
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={handleAddSkillTag}
                className="shrink-0 mt-1"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-border bg-muted"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkillTag(skill)}
                      className="opacity-50 hover:opacity-100 cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="button"
              onClick={handleSave}
              className="w-full h-10 gap-1.5 transition-colors duration-300 motion-reduce:transition-none"
              size="sm"
            >
              <Plus className="size-3.5" />
              {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
            </Button>
          </div>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={cn(
                'group p-5 rounded-none border border-border bg-background',
                'animate-in fade-in duration-300',
                'transition-colors duration-300',
                'motion-reduce:animate-none motion-reduce:transition-none',
                'flex flex-col sm:flex-row sm:items-center justify-between gap-4'
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase font-semibold tracking-widest bg-primary/10 text-primary border border-primary/20">
                    <Briefcase className="size-3" />
                    {EMPLOYMENT_TYPE_LABELS[exp.employmentType]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-muted-foreground">
                    <Calendar className="size-3" />
                    {formatMonth(exp.startDate)} —{' '}
                    {exp.currentlyWorking
                      ? 'Present'
                      : formatMonth(exp.endDate)}
                  </span>
                </div>

                <h5 className="font-display text-xl tracking-normal text-foreground leading-snug truncate">
                  {exp.title}
                </h5>

                {exp.companyName && (
                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Building2 className="size-3.5 opacity-60" />
                    {exp.companyName}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(index)}
                  className="h-8 px-2 text-xs font-mono uppercase tracking-widest gap-1 hover:bg-muted"
                >
                  <Edit2 className="size-3" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(index)}
                  className="h-8 px-2 text-xs font-mono uppercase tracking-widest gap-1 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                >
                  <X className="size-3" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {experiences.length === 0 && !isAdding && editingIndex === null && (
        <div
          className={cn(
            'text-center py-12 px-4 rounded-none border border-dashed border-border',
            'font-editorial text-lg text-foreground opacity-50',
            'transition-colors duration-300'
          )}
        >
          <Briefcase className="size-6 mx-auto mb-3 opacity-40" />
          Add your work experience to build trust with clients
        </div>
      )}

      {error && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-red-600 mt-2 animate-in fade-in duration-300 motion-reduce:animate-none">
          {error}
        </p>
      )}
    </div>
  );
}
