import type { CourseItem } from '../data/courses';
import GlowButton from './glow-button';

interface CourseCardProps {
  course: CourseItem;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel/70 p-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span>{course.category}</span>
        <span>{course.progress}%</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{course.title}</h3>
      <p className="mt-1 text-sm text-muted">Ментор: {course.mentor}</p>
      <p className="mt-4 text-sm text-white">Следующий урок</p>
      <p className="text-xs text-muted">{course.nextLesson}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted">Прогресс</span>
        <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-neon" style={{ width: `${course.progress}%` }} />
        </div>
      </div>
      <div className="mt-4">
        <GlowButton className="w-full">Продолжить</GlowButton>
      </div>
    </div>
  );
}
