import { GraduationCap } from 'lucide-react';

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

export default function ProfileEducation({ education }: ProfileEducationProps) {
  if (!education || education.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Education
        </h3>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="relative">
            {/* Timeline line */}
            {index !== education.length - 1 && (
              <div className="absolute top-8 bottom-[-24px] left-[11px] w-px bg-slate-200 dark:bg-slate-700" />
            )}

            <div className="flex gap-4">
              {/* Timeline dot */}
              <div className="mt-1.5 h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 z-10">
                <div className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                  {edu.school}
                </h4>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mt-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                  <span>{edu.country}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span>Class of {edu.yearOfGraduation}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
