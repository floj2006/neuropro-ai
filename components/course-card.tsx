import Link from 'next/link';
import { Course } from '../lib/data/courses';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <Badge>{course.level === 'Beginner' ? 'Начинающий' : course.level === 'Automation' ? 'Автоматизация' : course.level === 'AI Business' ? 'ИИ-бизнес' : 'Продвинутый'}</Badge>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[color:var(--muted)]">{course.description}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-[color:var(--muted)]">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.price}</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href={`/courses/${course.slug}`} className="text-sm text-[color:var(--neon-2)]">
          Подробнее
        </Link>
        <Button href={`/courses/${course.slug}`} size="sm">
          Записаться
        </Button>
      </CardFooter>
    </Card>
  );
}
