import { Briefcase } from 'lucide-react';

interface Skill {
  name: string;
}

interface Experience {
  id: string;
  title: string;
  companyName: string;
  employmentType: string;
  industry: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  description: string;
  skills: Skill[];
}

interface ProfileExperienceProps {
  experiences: Experience[];
}

export default function ProfileExperience({
  experiences,
}: ProfileExperienceProps) {
  if (!experiences || experiences.length === 0) return null;

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
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Experience
        </h3>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative">
            {/* Timeline line */}
            {index !== experiences.length - 1 && (
              <div className="absolute top-8 bottom-[-24px] left-[11px] w-px bg-slate-200 dark:bg-slate-700" />
            )}

            <div className="flex gap-4">
              {/* Timeline dot */}
              <div className="mt-1.5 h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 z-10">
                <div className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                    {exp.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mt-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {exp.companyName}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">
                      •
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {formatEmploymentType(exp.employmentType)}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">
                      •
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      {formatDate(exp.startDate)} -{' '}
                      {exp.currentlyWorking
                        ? 'Present'
                        : exp.endDate
                          ? formatDate(exp.endDate)
                          : ''}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line">
                  {exp.description}
                </p>

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
