'use client';

import { useEffect, useState } from 'react';
import { courseCategories, categoryTranslations } from '../lib/data/courses';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

const toId = (category: string) => `category-${category.replace(/\s+/g, '-').toLowerCase()}`;

export default function CourseCategoryNav() {
  const [value, setValue] = useState(courseCategories[0]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    const matched = courseCategories.find((cat) => toId(cat) === hash);
    if (matched) {
      setValue(matched);
    }
  }, []);

  const handleSelect = (category: string) => {
    setValue(category as typeof courseCategories[number]);
    const element = document.getElementById(toId(category));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Tabs value={value} onValueChange={handleSelect} className="mt-6">
      <TabsList className="flex flex-wrap gap-2">
        {courseCategories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {categoryTranslations[category]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
