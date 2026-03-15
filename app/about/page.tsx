import { Metadata } from 'next';
import SectionHeading from '../../components/section-heading';
import { Card } from '../../components/ui/card';

export const metadata: Metadata = {
  title: 'О нас',
  description: 'Узнайте о NeuroPro и нашей миссии — помочь людям освоить ИИ-карьеру.'
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="О нас"
          title="Мы помогаем людям освоить ИИ-инструменты и построить ИИ-карьеру"
          description="NeuroPro сочетает глубокую ИИ-экспертизу с практическими плейбуками, чтобы разработчики могли быстро достигать результатов."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">Наша миссия</h3>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Мы верим, что ИИ должен усиливать человеческое творчество и продуктивность. Наша миссия — 
              обеспечить профессионалов инструментами, воркфлоу и стратегическим пониманием для успеха 
              в мире, где ИИ играет первую скрипку.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Почему NeuroPro</h3>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Наши инструкторы — практики, которые разрабатывают ИИ в продакшене. Вы будете учиться 
              на реальных кейсах, проверенных стеках автоматизации и элитной ИИ-продуктовой стратегии.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
