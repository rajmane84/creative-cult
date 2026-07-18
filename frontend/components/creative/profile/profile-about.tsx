interface ProfileAboutProps {
  bio: string;
}

export default function ProfileAbout({ bio }: ProfileAboutProps) {
  if (!bio) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        About Me
      </h3>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
        {bio.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-2 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
