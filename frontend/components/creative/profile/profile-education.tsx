'use client';

import { useState } from 'react';
import { GraduationCap, Edit2, Plus, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/cn';
import { Degree } from '@/types';
import { useUpdateEducation } from '@/hooks/creative/profile';
import { handleApiError } from '@/lib/handle-error';

interface Education {
  id: string;
  school: string;
  degree: Degree;
  fieldOfStudy: string;
  country: string;
  yearOfGraduation: string;
}

interface ProfileEducationProps {
  education: Education[];
}

const formatDegree = (degree: string) => degree.replace(/_/g, ' ');

export default function ProfileEducation({ education }: ProfileEducationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { updateEducationMutation } = useUpdateEducation();

  const handleDelete = (id: string) => {
    const updatedEducation = education.filter((edu) => edu.id !== id);
    updateEducationMutation.mutate(
      { education: updatedEducation },
      {
        onError: (error) => {
          handleApiError(error, 'Failed to delete education');
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
              / Education
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
              ) : education.length > 0 ? (
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
            <EducationFormSection
              education={education}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              onDelete={handleDelete}
            />
          ) : education.length > 0 ? (
            education.map((edu, index) => (
              <div key={edu.id} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Year column */}
                  <div className="md:col-span-3">
                    <div className="font-mono text-xs uppercase tracking-wider opacity-60">
                      Class of {edu.yearOfGraduation}
                    </div>
                  </div>

                  {/* Content column */}
                  <div className="md:col-span-9 space-y-3">
                    <div>
                      <h4 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-none">
                        {formatDegree(edu.degree)} in {edu.fieldOfStudy}
                      </h4>
                      <div className="font-mono text-sm uppercase tracking-wider opacity-70 mt-2">
                        {edu.school}
                        <span className="mx-2 opacity-40">·</span>
                        {edu.country}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider between education entries */}
                {index !== education.length - 1 && (
                  <div className="mt-12 border-t border-border opacity-30" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50">
              <GraduationCap className="size-6 mx-auto mb-3 opacity-40" />
              Add your education to showcase your qualifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EducationFormSection({
  education,
  isAdding,
  setIsAdding,
  onDelete,
}: {
  education: Education[];
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const { updateEducationMutation } = useUpdateEducation();
  const [formData, setFormData] = useState({
    school: '',
    degree: Degree.BSC,
    fieldOfStudy: '',
    country: '',
    yearOfGraduation: '',
  });

  const handleSubmit = () => {
    const newEducation = {
      ...formData,
      yearOfGraduation: formData.yearOfGraduation,
    };

    updateEducationMutation.mutate(
      { education: [...education, newEducation] },
      {
        onSuccess: () => {
          setFormData({
            school: '',
            degree: Degree.BSC,
            fieldOfStudy: '',
            country: '',
            yearOfGraduation: '',
          });
          setIsAdding(false);
        },
        onError: (error) => {
          handleApiError(error, 'Failed to add education');
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
          Education
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
              Add Education
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
          <div className="space-y-4">
            <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
              School *
            </Label>
            <Input
              placeholder="e.g., University of Design"
              value={formData.school}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Degree
              </Label>
              <select
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value as Degree })
                }
                className="w-full h-10 px-3 rounded-none border border-border bg-background focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out font-mono text-[11px] uppercase tracking-widest"
              >
                {Object.values(Degree).map((degree) => (
                  <option key={degree} value={degree}>
                    {formatDegree(degree)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Field of Study
              </Label>
              <Input
                placeholder="e.g., Graphic Design"
                value={formData.fieldOfStudy}
                onChange={(e) =>
                  setFormData({ ...formData, fieldOfStudy: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Country
              </Label>
              <Input
                placeholder="e.g., United States"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
              />
            </div>

            <div className="space-y-4">
              <Label className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                Year of Graduation *
              </Label>
              <Input
                type="number"
                placeholder="e.g., 2020"
                min="1950"
                max="2030"
                value={formData.yearOfGraduation}
                onChange={(e) =>
                  setFormData({ ...formData, yearOfGraduation: e.target.value })
                }
                className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
              disabled={updateEducationMutation.isPending}
              className="flex-1 h-10 transition-all duration-200 ease-out hover:bg-muted/80 motion-reduce:transition-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                !formData.school ||
                !formData.yearOfGraduation ||
                updateEducationMutation.isPending
              }
              className="flex-1 h-10 gap-1.5 transition-all duration-200 ease-out hover:bg-primary/90 motion-reduce:transition-none"
            >
              {updateEducationMutation.isPending ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>Add Education</>
              )}
            </Button>
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="relative p-4 border border-border bg-background animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out transition-all duration-200 ease-out hover:shadow-sm motion-reduce:animate-none motion-reduce:transition-none"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-display text-lg font-bold">
                    {formatDegree(edu.degree)} in {edu.fieldOfStudy}
                  </h5>
                  <p className="font-mono text-sm opacity-70 mt-1">
                    {edu.school} · Class of {edu.yearOfGraduation}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onDelete(edu.id)}
                  disabled={updateEducationMutation.isPending}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 ease-out hover:scale-110"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {education.length === 0 && !isAdding && (
        <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50 animate-in fade-in duration-500 ease-out motion-reduce:animate-none">
          <GraduationCap className="size-6 mx-auto mb-3 opacity-40" />
          Add your education to showcase your qualifications
        </div>
      )}
    </div>
  );
}
