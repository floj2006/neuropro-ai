interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left'
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left';

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--neon-2)]">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {description ? (
        <p className={`text-base text-[color:var(--muted)] ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
