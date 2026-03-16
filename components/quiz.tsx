'use client';

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizProps {
  quizId: string;
  title: string;
  questions: Question[];
  bestAttempt?: {
    score: number;
    createdAt: string;
  } | null;
  onComplete?: (result: { score: number; passed: boolean }) => void;
}

export default function Quiz({ quizId, title, questions, bestAttempt, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correctAnswers: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/quiz-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers: selectedAnswers })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке теста');
      }

      setResult({
        score: data.attempt.score,
        passed: data.attempt.passed,
        correctAnswers: data.attempt.correctAnswers
      });
      setShowResults(true);
      onComplete?.(data.attempt);
    } catch (error) {
      console.error('Quiz submit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setResult(null);
  };

  if (showResults && result) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
            result.passed ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {result.passed ? (
              <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-white">
            {result.passed ? 'Тест сдан!' : 'Тест не сдан'}
          </h3>
          
          <div className="mt-4 space-y-2">
            <p className="text-4xl font-bold text-[color:var(--neon-2)]">{result.score}%</p>
            <p className="text-sm text-[color:var(--muted)]">
              Правильных ответов: {result.correctAnswers} из {questions.length}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {result.passed ? (
              <Button onClick={() => setShowResults(false)} variant="outline">
                Закрыть
              </Button>
            ) : (
              <Button onClick={handleRetry} className="glow">
                Пройти ещё раз
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="p-6">
      {/* Заголовок */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          Вопрос {currentQuestion + 1} из {questions.length}
        </p>
      </div>

      {/* Прогресс бар */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--neon-2)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Лучшая попытка */}
      {bestAttempt && !showResults && (
        <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
          <p className="text-sm text-green-400">
            ✓ Ваш лучший результат: {bestAttempt.score}%
          </p>
        </div>
      )}

      {/* Вопрос */}
      <div className="mb-6">
        <p className="text-base font-medium text-white">{question.question}</p>
      </div>

      {/* Варианты ответов */}
      <div className="mb-6 space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full rounded-lg border p-4 text-left transition ${
              selectedAnswers[currentQuestion] === index
                ? 'border-[color:var(--neon)] bg-[color:var(--neon)]/10 text-white'
                : 'border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20'
            }`}
          >
            <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
            {option}
          </button>
        ))}
      </div>

      {/* Навигация */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          Назад
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined || submitting}
          className="glow"
        >
          {currentQuestion === questions.length - 1 
            ? (submitting ? 'Отправка...' : 'Завершить') 
            : 'Далее'}
        </Button>
      </div>
    </Card>
  );
}
