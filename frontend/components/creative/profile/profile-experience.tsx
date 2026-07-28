'use client';

import { useState } from 'react';
import { Briefcase, Edit2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditExperienceDialog } from './dialog/edit-experience-dialog';
import { EmploymentType } from '@/types';

interface Experience {
  id: string;
  title: string;
  companyName?: string | null;
  employmentType: string;
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

const toMonthInput = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export default function ProfileExperience({
  experiences,
}: ProfileExperienceProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const formatEmploymentType = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
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
              onClick={() => setIsEditOpen(true)}
              className="h-7 gap-1.5 -mr-2"
            >
              {experiences.length > 0 ? (
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
          {experiences.length > 0 ? (
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

      <EditExperienceDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        experiences={experiences.map((exp) => ({
          title: exp.title,
          employmentType: exp.employmentType as EmploymentType,
          companyName: exp.companyName || '',
          industry: exp.industry || '',
          startDate: toMonthInput(exp.startDate),
          endDate: toMonthInput(exp.endDate),
          currentlyWorking: exp.currentlyWorking,
          description: exp.description || '',
          skills: exp.skills,
        }))}
      />
    </div>
  );
}
