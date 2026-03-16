'use client';

import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  provider?: 'youtube' | 'vimeo' | 'local';
  onVideoEnd?: () => void;
}

export default function VideoPlayer({ videoUrl, title, provider = 'youtube', onVideoEnd }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Извлекаем ID видео из URL
  const getVideoId = (url: string): string | null => {
    if (provider === 'youtube') {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /youtube\.com\/embed\/([^?&\s]+)/,
        /youtube\.com\/v\/([^?&\s]+)/
      ];
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
    } else if (provider === 'vimeo') {
      const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = getVideoId(videoUrl);

  const getEmbedUrl = () => {
    if (!videoId) return null;
    
    if (provider === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
    } else if (provider === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  const handleVideoEnd = () => {
    setHasEnded(true);
    setIsPlaying(false);
    onVideoEnd?.();
  };

  // Для локальных видео
  if (provider === 'local') {
    return (
      <Card className="overflow-hidden bg-black">
        {title && (
          <div className="border-b border-white/10 bg-white/5 px-4 py-3">
            <h3 className="text-sm font-medium text-white">{title}</h3>
          </div>
        )}
        <div className="relative aspect-video">
          <video
            src={videoUrl}
            controls
            className="h-full w-full"
            onEnded={handleVideoEnd}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </Card>
    );
  }

  // Для YouTube/Vimeo
  if (!embedUrl) {
    return (
      <Card className="p-6">
        <p className="text-sm text-red-400">Неверный URL видео</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-black">
      {title && (
        <div className="border-b border-white/10 bg-white/5 px-4 py-3">
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
      )}
      <div className="relative aspect-video">
        <iframe
          ref={iframeRef}
          src={`${embedUrl}${isPlaying ? '&autoplay=1' : ''}`}
          title={title || 'Video'}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsPlaying(true)}
        />
      </div>
      
      {/* Кнопка завершения просмотра */}
      {hasEnded && (
        <div className="border-t border-white/10 bg-green-500/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-400">✓ Видео просмотрено до конца</p>
            <Button size="sm" variant="outline" onClick={() => setHasEnded(false)}>
              Смотреть ещё раз
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

// Компонент для отображения списка видео уроков
interface VideoLesson {
  id: string;
  moduleId: number;
  lessonId: number;
  title: string;
  videoUrl: string;
  provider: string;
  duration?: number;
}

interface VideoLessonListProps {
  courseId: string;
  videos: VideoLesson[];
  completedLessons: Record<string, boolean>;
  onVideoSelect: (video: VideoLesson) => void;
  onLessonComplete: (moduleId: number, lessonId: number) => void;
}

export function VideoLessonList({ 
  videos, 
  completedLessons, 
  onVideoSelect,
  onLessonComplete 
}: VideoLessonListProps) {
  // Форматируем длительность
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Группируем по модулям
  const groupedByModule = videos.reduce((acc, video) => {
    const moduleKey = `module-${video.moduleId}`;
    if (!acc[moduleKey]) {
      acc[moduleKey] = {
        moduleId: video.moduleId,
        videos: []
      };
    }
    acc[moduleKey].videos.push(video);
    return acc;
  }, {} as Record<string, { moduleId: number; videos: typeof videos }>);

  return (
    <div className="space-y-6">
      {Object.values(groupedByModule).map(({ moduleId, videos: moduleVideos }) => (
        <div key={moduleId} className="space-y-2">
          <h4 className="text-sm font-semibold text-white">Модуль {moduleId + 1}</h4>
          <div className="space-y-2">
            {moduleVideos.map((video) => {
              const key = `${video.moduleId}-${video.lessonId}`;
              const isCompleted = completedLessons[key] || false;
              
              return (
                <button
                  key={video.id}
                  onClick={() => onVideoSelect(video)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                    isCompleted
                      ? 'border-green-500/30 bg-green-500/10'
                      : 'border-white/10 bg-white/5 hover:border-[color:var(--neon)]'
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    {isCompleted ? (
                      <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-[color:var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                      {video.title}
                    </p>
                  </div>
                  <span className="text-xs text-[color:var(--muted)]">
                    {formatDuration(video.duration)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
