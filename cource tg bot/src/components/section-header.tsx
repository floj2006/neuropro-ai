interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="section-title text-xs font-semibold uppercase text-neon2">{eyebrow}</p>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {description ? <p className="text-sm text-muted">{description}</p> : null}
    </div>
  );
}
