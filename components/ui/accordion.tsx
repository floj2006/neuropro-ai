import { cn } from '../../lib/utils';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <details
          key={item.title}
          className="group rounded-2xl border border-white/10 bg-[color:rgba(12,14,26,0.9)] p-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white">
            {item.title}
            <span className="text-[color:var(--neon-2)] transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm text-[color:var(--muted)]">{item.content}</p>
        </details>
      ))}
    </div>
  );
}
