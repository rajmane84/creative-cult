'use client';

import { useState } from 'react';
import { GraduationCap, Edit2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditEducationDialog } from './dialog/edit-education-dialog';
import { Degree } from '@/types';

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  country: string;
  yearOfGraduation: string;
}

interface ProfileEducationProps {
  education: Education[];
}

const formatDegree = (degree: string) => degree.replace(/_/g, ' ');

export default function ProfileEducation({ education }: ProfileEducationProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

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
              onClick={() => setIsEditOpen(true)}
              className="h-7 gap-1.5 -mr-2"
            >
              {education.length > 0 ? (
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
          {education.length > 0 ? (
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

      <EditEducationDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        education={education.map((edu) => ({
          school: edu.school,
          degree: edu.degree as Degree,
          fieldOfStudy: edu.fieldOfStudy,
          country: edu.country,
          yearOfGraduation: edu.yearOfGraduation,
        }))}
      />
    </div>
  );
}
