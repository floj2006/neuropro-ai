import { PrismaClient } from '@prisma/client';
import { courses } from '../lib/data/courses';

const prisma = new PrismaClient();

const levelMap: Record<string, 'BEGINNER' | 'AUTOMATION' | 'AI_BUSINESS' | 'ADVANCED'> = {
  'Beginner': 'BEGINNER',
  'Automation': 'AUTOMATION',
  'AI Business': 'AI_BUSINESS',
  'Advanced': 'ADVANCED'
};

function toJson<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as never;
}

async function main() {
  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        description: course.description,
        price: course.price,
        duration: course.duration,
        level: levelMap[course.level],
        modules: toJson(course.modules),
        detailedModules: toJson(course.detailedModules),
        outcomes: toJson(course.outcomes),
        whatIncluded: toJson(course.whatIncluded)
      },
      create: {
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
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Courses seeded');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
