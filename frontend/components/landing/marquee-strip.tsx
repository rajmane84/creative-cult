import Marquee from 'react-fast-marquee';

const items = [
  'Photography',
  'Videography',
  'Direction',
  'Choreography',
  'Sound Design',
  'Illustration',
  'Set Styling',
  'Editing',
  'Motion',
];

export default function MarqueeStrip() {
  return (
    <section className="relative overflow-hidden no-scrollbar border-b border-border bg-background py-6 md:py-10">
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover
        className="no-scrollbar overflow-y-hidden"
      >
        {items.concat(items).map((label, i) => (
          <span key={i} className="marquee-text flex items-center gap-8">
            <span className={i % 2 === 0 ? '' : 'text-outline'}>{label}</span>

            <span className="px-6 text-primary">✳</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
