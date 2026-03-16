import { Metadata } from 'next';
import CoursesClient from './courses-client';

export const metadata: Metadata = {
  title: 'Курсы',
  description: 'Каталог курсов NeuroPro по направлениям: базовый ИИ, автоматизация, AI-бизнес и advanced.'
};

export default function CoursesPage() {
  return <CoursesClient />;
}
