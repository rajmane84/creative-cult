interface ProfileAboutProps {
  bio: string;
}

export default function ProfileAbout({ bio }: ProfileAboutProps) {
  if (!bio) return null;

  return (
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest opacity-60 sticky top-8">
            / About
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="font-editorial text-xl md:text-2xl lg:text-3xl leading-relaxed space-y-6 opacity-90">
            {bio.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
