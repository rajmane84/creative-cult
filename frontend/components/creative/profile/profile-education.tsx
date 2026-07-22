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
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 sticky top-8">
            / Education
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-12">
          {education.map((edu, index) => (
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
                      {edu.school}
                    </h4>
                    <div className="font-mono text-sm uppercase tracking-wider opacity-70 mt-2">
                      {edu.degree} in {edu.fieldOfStudy}
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
          ))}
        </div>
      </div>
    </div>
  );
}
