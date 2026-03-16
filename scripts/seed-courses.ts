import { PrismaClient, CourseCategory } from '@prisma/client';
import { courses } from '../lib/data/courses';

const prisma = new PrismaClient();

const levelMap: Record<string, CourseCategory> = {
  'Beginner': CourseCategory.BEGINNER,
  'Automation': CourseCategory.AUTOMATION,
  'AI Business': CourseCategory.AI_BUSINESS,
  'Advanced': CourseCategory.ADVANCED
};

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
        modules: course.modules,
        detailedModules: course.detailedModules,
        outcomes: course.outcomes,
        whatIncluded: course.whatIncluded
      },
      create: {
        slug: course.slug,
        title: course.title,
        description: course.description,
        price: course.price,
        duration: course.duration,
        level: levelMap[course.level],
        modules: course.modules,
        detailedModules: course.detailedModules,
        outcomes: course.outcomes,
        whatIncluded: course.whatIncluded
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
