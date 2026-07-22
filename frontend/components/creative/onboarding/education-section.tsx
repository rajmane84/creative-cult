'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  X,
  Plus,
  GraduationCap,
  ChevronDown,
  Edit2,
  BookOpen,
  Calendar,
  Building2,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Degree } from '@/types';
import { Education, educationSchema } from '@/validations/creative/onboarding';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EducationSectionProps {
  educationList: Education[];
  onChange: (educationList: Education[]) => void;
  error?: string;
}

const DEGREE_LABELS: Record<Degree, string> = {
  [Degree.HIGH_SCHOOL]: 'High School Diploma',
  [Degree.DIPLOMA]: 'Diploma',
  [Degree.BSC]: 'B.Sc — Bachelor of Science',
  [Degree.BCA]: 'BCA — Bachelor of Computer Applications',
  [Degree.BCOM]: 'B.Com — Bachelor of Commerce',
  [Degree.BA]: 'B.A. — Bachelor of Arts',
  [Degree.BTECH]: 'B.Tech — Bachelor of Technology',
  [Degree.BE]: 'B.E. — Bachelor of Engineering',
  [Degree.BPHARM]: 'B.Pharm — Bachelor of Pharmacy',
  [Degree.LLB]: 'LL.B — Bachelor of Laws',
  [Degree.MBBS]: 'MBBS — Bachelor of Medicine & Surgery',
  [Degree.MSC]: 'M.Sc — Master of Science',
  [Degree.MCA]: 'MCA — Master of Computer Applications',
  [Degree.MCOM]: 'M.Com — Master of Commerce',
  [Degree.MA]: 'M.A. — Master of Arts',
  [Degree.MTECH]: 'M.Tech — Master of Technology',
  [Degree.ME]: 'M.E. — Master of Engineering',
  [Degree.MBA]: 'MBA — Master of Business Administration',
  [Degree.MPHARM]: 'M.Pharm — Master of Pharmacy',
  [Degree.LLM]: 'LL.M — Master of Laws',
  [Degree.MD]: 'M.D. — Doctor of Medicine',
  [Degree.PHD]: 'Ph.D. — Doctor of Philosophy',
  [Degree.OTHER]: 'Other Qualification',
};

export default function EducationSection({
  educationList,
  onChange,
  error,
}: EducationSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState<Education>({
    school: '',
    degree: Degree.BSC,
    fieldOfStudy: '',
    country: '',
    yearOfGraduation: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      school: '',
      degree: Degree.BSC,
      fieldOfStudy: '',
      country: '',
      yearOfGraduation: new Date().getFullYear().toString(),
    });
    setFormErrors({});
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
    setFormData(educationList[index]);
    setFormErrors({});
    setIsDropdownOpen(false);
    setIsAdding(true);
  };

  const handleRemove = (index: number) => {
    const updated = educationList.filter((_, i) => i !== index);
    onChange(updated);
    if (editingIndex === index) {
      setIsAdding(false);
      setEditingIndex(null);
      resetForm();
    }
  };

  const handleSaveEducation = () => {
    const parseResult = educationSchema.safeParse(formData);

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

    if (editingIndex !== null) {
      const updated = [...educationList];
      updated[editingIndex] = parseResult.data;
      onChange(updated);
    } else {
      onChange([...educationList, parseResult.data]);
    }

    setIsAdding(false);
    setEditingIndex(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Label
          htmlFor="education"
          className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
        >
          Education & Qualifications
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
              Add Education
            </>
          )}
        </Button>
      </div>

      {/* Inline Form Box (Replicating Step 2 Skills Inline Form Box) */}
      {(isAdding || editingIndex !== null) && (
        <div
          className={cn(
            'space-y-4 p-6 rounded-none border border-border bg-background',
            'animate-in fade-in duration-300',
            'transition-all duration-300',
            'motion-reduce:animate-none motion-reduce:transition-none'
          )}
        >
          {/* School / Institution */}
          <div className="space-y-2 min-w-0">
            <Label
              htmlFor="school"
              className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
            >
              School / University *
            </Label>
            <Input
              id="school"
              type="text"
              placeholder="e.g., Stanford University or National Institute of Design"
              value={formData.school}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              autoFocus
            />
            {formErrors.school && (
              <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                {formErrors.school}
              </p>
            )}
          </div>

          {/* Degree & Field of Study */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="degree"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                Degree *
              </Label>
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <DropdownMenuTrigger className="flex w-full items-center justify-between h-10 px-3 py-2 rounded-none border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-0">
                  <span className="truncate">
                    {DEGREE_LABELS[formData.degree] || 'Select degree'}
                  </span>
                  <ChevronDown className="size-3.5 opacity-60 shrink-0 ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  data-lenis-prevent
                  onWheel={(e) => e.stopPropagation()}
                  className="w-[var(--anchor-width)] max-h-60 overflow-y-auto overscroll-contain no-scrollbar rounded-none border border-border bg-background shadow-xl z-[100] p-1"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuRadioGroup
                      value={formData.degree}
                      onValueChange={(val) => {
                        if (val) {
                          setFormData({
                            ...formData,
                            degree: val as Degree,
                          });
                          setIsDropdownOpen(false);
                        }
                      }}
                    >
                      {Object.entries(DEGREE_LABELS).map(([key, label]) => (
                        <DropdownMenuRadioItem
                          key={key}
                          value={key}
                          onClick={() => setIsDropdownOpen(false)}
                          className="font-sans text-sm py-2 px-3 rounded-none cursor-pointer focus:bg-muted focus:text-foreground"
                        >
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {formErrors.degree && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                  {formErrors.degree}
                </p>
              )}
            </div>

            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="fieldOfStudy"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                Field of Study *
              </Label>
              <Input
                id="fieldOfStudy"
                type="text"
                placeholder="e.g., Computer Science, Visual Design"
                value={formData.fieldOfStudy}
                onChange={(e) =>
                  setFormData({ ...formData, fieldOfStudy: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
              {formErrors.fieldOfStudy && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                  {formErrors.fieldOfStudy}
                </p>
              )}
            </div>
          </div>

          {/* Country & Graduation Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="country"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                Country *
              </Label>
              <Input
                id="country"
                type="text"
                placeholder="e.g., United States"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
              {formErrors.country && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                  {formErrors.country}
                </p>
              )}
            </div>

            <div className="space-y-2 min-w-0">
              <Label
                htmlFor="yearOfGraduation"
                className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
              >
                Graduation Year *
              </Label>
              <Input
                id="yearOfGraduation"
                type="text"
                placeholder="e.g., 2024"
                value={formData.yearOfGraduation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearOfGraduation: e.target.value,
                  })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
              {formErrors.yearOfGraduation && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">
                  {formErrors.yearOfGraduation}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button inside Inline Form */}
          <div className="pt-2">
            <Button
              type="button"
              onClick={handleSaveEducation}
              className="w-full h-10 gap-1.5 transition-colors duration-300 motion-reduce:transition-none"
              size="sm"
            >
              <Plus className="size-3.5" />
              {editingIndex !== null ? 'Update Education' : 'Add Education'}
            </Button>
          </div>
        </div>
      )}

      {/* Added Education Cards List */}
      {educationList.length > 0 && (
        <div className="space-y-3">
          {educationList.map((item, index) => (
            <div
              key={index}
              className={cn(
                'group p-5 rounded-none border border-border bg-background',
                'animate-in fade-in duration-300',
                'transition-colors duration-300',
                'motion-reduce:animate-none motion-reduce:transition-none',
                'flex flex-col sm:flex-row sm:items-center justify-between gap-4'
              )}
              style={{
                animationDelay: `${index * 30}ms`,
              }}
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase font-semibold tracking-widest bg-primary/10 text-primary border border-primary/20">
                    <BookOpen className="size-3 selection:text-background selection:bg-primary" />
                    {DEGREE_LABELS[item.degree] || item.degree}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-muted-foreground">
                    <Calendar className="size-3" />
                    {item.yearOfGraduation}
                  </span>
                </div>

                <h5 className="font-display text-xl tracking-normal text-foreground leading-snug truncate">
                  {item.fieldOfStudy}
                </h5>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                    <Building2 className="size-3.5 opacity-60" />
                    {item.school}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 opacity-60" />
                    {item.country}
                  </span>
                </div>
              </div>

              {/* Actions */}
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

      {/* Empty State Box (Replicating Step 2 Empty State Box) */}
      {educationList.length === 0 && !isAdding && editingIndex === null && (
        <div
          className={cn(
            'text-center py-12 px-4 rounded-none border border-dashed border-border',
            'font-editorial text-lg text-foreground opacity-50',
            'transition-colors duration-300'
          )}
        >
          <GraduationCap className="size-6 mx-auto mb-3 opacity-40" />
          Add your education to showcase your qualifications
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
