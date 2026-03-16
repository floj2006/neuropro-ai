import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { courses } from '@/lib/data/courses';
import CourseMaterialsClient from './client-page';

interface CourseMaterialsProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }: CourseMaterialsProps): Metadata {
  const course = courses.find((item) => item.slug === params.slug);

  if (!course) {
    return {};
  }

  return {
    title: `${course.title} | Материалы курса`,
    description: course.description
  };
}

export default function CourseMaterialsPage({ params }: CourseMaterialsProps) {
  const course = courses.find((item) => item.slug === params.slug);

  if (!course) {
    notFound();
  }

  return <CourseMaterialsClient />;
}
