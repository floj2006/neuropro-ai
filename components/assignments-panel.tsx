'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Assignment {
  id: string;
  courseId: string;
  moduleId: number;
  lessonId: number;
  content: string;
  status: string;
  feedback?: string | null;
  submittedAt?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
}

interface AssignmentsPanelProps {
  courseId: string;
  currentModuleId?: number;
  currentLessonId?: number;
}

const statusLabels: Record<string, string> = {
  'pending': 'Черновик',
  'submitted': 'Отправлено',
  'reviewed': 'Принято',
  'rejected': 'На доработке'
};

const statusColors: Record<string, string> = {
  'pending': 'text-[color:var(--muted)]',
  'submitted': 'text-yellow-400',
  'reviewed': 'text-green-400',
  'rejected': 'text-red-400'
};

export default function AssignmentsPanel({ courseId, currentModuleId, currentLessonId }: AssignmentsPanelProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`/api/assignments?courseId=${courseId}`);
      const data = await response.json();
      if (response.ok) {
        setAssignments(data.assignments);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (moduleId: number, lessonId: number) => {
    if (!newContent.trim()) {
      alert('Введите текст задания');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          moduleId,
          lessonId,
          content: newContent
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке');
      }

      setNewContent('');
      fetchAssignments();
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert(error instanceof Error ? error.message : 'Ошибка при отправке');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Домашние задания</h3>

      {loading ? (
        <Card className="p-6 text-center">
          <p className="text-sm text-[color:var(--muted)]">Загрузка...</p>
        </Card>
      ) : assignments.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-[color:var(--muted)]">
            У вас пока нет отправленных заданий
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {assignments.map((assignment) => (
            <Card 
              key={assignment.id} 
              className={`p-4 ${selectedAssignment?.id === assignment.id ? 'border-[color:var(--neon)]' : ''}`}
            >
              <div 
                className="cursor-pointer"
                onClick={() => setSelectedAssignment(assignment)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">
                    Модуль {assignment.moduleId + 1}, Урок {assignment.lessonId + 1}
                  </p>
                  <span className={`text-xs ${statusColors[assignment.status]}`}>
                    {statusLabels[assignment.status]}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  Отправлено: {assignment.submittedAt 
                    ? new Date(assignment.submittedAt).toLocaleDateString('ru-RU') 
                    : '—'}
                </p>
              </div>

              {selectedAssignment?.id === assignment.id && (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="rounded-lg bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      Ваше решение
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-white">
                      {assignment.content}
                    </p>
                  </div>

                  {assignment.feedback && (
                    <div className="mt-4 rounded-lg bg-green-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-green-400">
                        Обратная связь
                      </p>
                      <p className="mt-2 text-sm text-white">
                        {assignment.feedback}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Форма отправки нового задания */}
      {currentModuleId !== undefined && currentLessonId !== undefined && (
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-white">
            Отправить задание для модуля {currentModuleId + 1}, урок {currentLessonId + 1}
          </h4>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Введите ваше решение..."
            className="mt-3 h-32 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
          />
          <Button
            onClick={() => handleSubmit(currentModuleId, currentLessonId)}
            disabled={submitting || !newContent.trim()}
            className="mt-3 w-full"
          >
            {submitting ? 'Отправка...' : 'Отправить на проверку'}
          </Button>
        </Card>
      )}
    </div>
  );
}
