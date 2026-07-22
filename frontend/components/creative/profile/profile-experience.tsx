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
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 sticky top-8">
            / Experience
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-12">
          {experiences.map((exp, index) => (
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
                      {exp.companyName}
                      <span className="mx-2 opacity-40">·</span>
                      {formatEmploymentType(exp.employmentType)}
                    </div>
                  </div>

                  <p className="font-editorial text-lg leading-relaxed opacity-80 whitespace-pre-line">
                    {exp.description}
                  </p>

                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 text-xs font-mono uppercase tracking-wider border border-border bg-muted opacity-70"
                        >
                          {skill.name}
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
          ))}
        </div>
      </div>
    </div>
  );
}
