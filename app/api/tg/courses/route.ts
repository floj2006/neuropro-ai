import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { courses as seedCourses } from '../../../../lib/data/courses';

const levelMap: Record<string, 'BEGINNER' | 'AUTOMATION' | 'AI_BUSINESS' | 'ADVANCED'> = {
  'Beginner': 'BEGINNER',
  'Automation': 'AUTOMATION',
  'AI Business': 'AI_BUSINESS',
  'Advanced': 'ADVANCED'
};

const mentorMap = new Map(seedCourses.map((course) => [course.slug, course.instructor.name]));

function toJson<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as never;
}

async function ensureCourses() {
  const count = await prisma.course.count();
  if (count > 0) {
    return;
  }
  await Promise.all(
    seedCourses.map((course) =>
      prisma.course.create({
        data: {
          slug: course.slug,
          title: course.title,
          description: course.description,
          price: course.price,
          duration: course.duration,
          level: levelMap[course.level],
          modules: toJson(course.modules),
          detailedModules: toJson(course.detailedModules),
          outcomes: toJson(course.outcomes),
          whatIncluded: toJson(course.whatIncluded)
        }
      })
    )
  );
}

export async function GET() {
  await ensureCourses();
  const rows = await prisma.course.findMany({
    orderBy: { createdAt: 'asc' }
  });

  const mapped = rows.map((course: (typeof rows)[number]) => {
    const modulesArray = Array.isArray(course.modules) ? course.modules : [];
    return {
      id: course.slug,
      title: course.title,
      category:
        course.level === 'BEGINNER'
          ? 'Начинающий'
          : course.level === 'AUTOMATION'
            ? 'Автоматизация'
            : course.level === 'AI_BUSINESS'
              ? 'AI-бизнес'
              : 'Продвинутый',
      progress: Math.min(100, Math.max(0, modulesArray.length * 12)),
      nextLesson: modulesArray.length > 0 ? String(modulesArray[0]) : 'Скоро откроется',
      mentor: mentorMap.get(course.slug) ?? 'Ментор NeuroPro'
    };
  });

  return NextResponse.json(mapped);
}
