'use client';

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Bookmark {
  id: string;
  courseId: string;
  moduleId: number;
  lessonId: number;
  note?: string | null;
  createdAt: string;
}

interface BookmarksPanelProps {
  courseId: string;
  bookmarks: Bookmark[];
  onBookmarkSelect: (bookmark: Bookmark) => void;
  onBookmarkDelete: (id: string) => void;
}

export default function BookmarksPanel({ 
  courseId, 
  bookmarks, 
  onBookmarkSelect,
  onBookmarkDelete 
}: BookmarksPanelProps) {
  const [addingNote, setAddingNote] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddBookmark = (moduleId: number, lessonId: number) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
    setAddingNote(true);
    setNoteText('');
  };

  const handleSaveBookmark = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          moduleId: currentModuleId,
          lessonId: currentLessonId,
          note: noteText
        })
      });

      if (response.ok) {
        setAddingNote(false);
        // Обновляем список
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving bookmark:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить закладку?')) return;
    
    try {
      const response = await fetch(`/api/bookmarks?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        onBookmarkDelete(id);
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Закладки</h3>
        <span className="text-sm text-[color:var(--muted)]">
          {bookmarks.length} шт.
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-sm text-[color:var(--muted)]">
            У вас пока нет закладок
          </p>
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            Отмечайте важные уроки для быстрого доступа
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => onBookmarkSelect(bookmark)}
                >
                  <p className="text-sm font-medium text-white">
                    Модуль {bookmark.moduleId + 1}, Урок {bookmark.lessonId + 1}
                  </p>
                  {bookmark.note && (
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      {bookmark.note}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-[color:var(--muted)]">
                    {new Date(bookmark.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="text-[color:var(--muted)] transition hover:text-red-400"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Модальное окно для добавления заметки */}
      {addingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-white">Добавить закладку</h3>
            
            <div className="mt-4">
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Заметка (необязательно)
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Напишите заметку..."
                className="mt-2 h-32 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleSaveBookmark}
                disabled={saving}
                className="flex-1"
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button
                onClick={() => setAddingNote(false)}
                variant="outline"
              >
                Отмена
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// Кнопка для добавления закладки
export function AddBookmarkButton({ 
  moduleId, 
  lessonId, 
  onClick 
}: { 
  moduleId: number; 
  lessonId: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-xs text-[color:var(--muted)] transition hover:text-[color:var(--neon-2)]"
      title="Добавить закладку"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <span>Закладка</span>
    </button>
  );
}
