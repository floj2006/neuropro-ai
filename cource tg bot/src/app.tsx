'use client';

import { useEffect, useMemo, useState } from 'react';
import CourseCard from './components/course-card';
import GlowButton from './components/glow-button';
import ProgressRing from './components/progress-ring';
import SectionHeader from './components/section-header';
import StatCard from './components/stat-card';
import TopBar from './components/top-bar';
import { getTelegramUser, initTelegram } from './lib/telegram';
import PaymentCard from './components/payment-card';
import type { CourseItem } from './data/courses';
import type { PaymentItem } from './data/payments';
import type { ActivityItem } from './data/activity';

const API_BASE = 'http://localhost:3000';
const AUTH_URL = 'http://localhost:3000/auth/signup';
const FAQ_URL = 'http://localhost:3000/faq';
const SUPPORT_URL = 'http://localhost:3000/contact';

interface ProfileResponse {
  authenticated?: boolean;
  user?: {
    id: string;
    name: string;
    role: string;
    status: string;
    privileges: string[];
  };
  purchases?: Array<{
    courseSlug: string;
    title: string;
    price: string;
    status: string;
  }>;
  progress?: Array<{
    courseSlug: string;
    title: string;
    progress: number;
    nextLesson: string;
  }>;
}

function openExternal(url: string) {
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.openLink) {
    tg.openLink(url);
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

function buildAuthUrl(telegramId: string, name: string) {
  if (!telegramId) {
    return AUTH_URL;
  }
  const url = new URL(AUTH_URL);
  url.searchParams.set('telegramId', telegramId);
  if (name) {
    url.searchParams.set('name', name);
  }
  return url.toString();
}

export default function App() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  useEffect(() => {
    initTelegram();
  }, []);

  const tgUser = getTelegramUser();
  const name = tgUser?.first_name ? `${tgUser.first_name} ${tgUser.last_name ?? ''}`.trim() : '';
  const telegramId = tgUser?.id ? String(tgUser.id) : '';

  const fetchAll = async () => {
    const [coursesRes, paymentsRes, activityRes, profileRes] = await Promise.all([
      fetch(`${API_BASE}/api/tg/courses`),
      fetch(`${API_BASE}/api/tg/payments`),
      fetch(`${API_BASE}/api/tg/activity`),
      fetch(`${API_BASE}/api/tg/profile?telegramId=${encodeURIComponent(telegramId)}`)
    ]);
    setCourses(await coursesRes.json());
    setPayments(await paymentsRes.json());
    setActivity(await activityRes.json());
    setProfile(await profileRes.json());
  };

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        await fetchAll();
      } catch {
        // leave empty arrays on failure
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    const onFocus = () => {
      load();
    };
    window.addEventListener('focus', onFocus);
    return () => {
      isMounted = false;
      window.removeEventListener('focus', onFocus);
    };
  }, [telegramId]);

  const averageProgress = useMemo(() => {
    if (!courses.length) {
      return 0;
    }
    const total = courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(total / courses.length);
  }, [courses]);

  const isAuthenticated = profile?.authenticated === true;
  const displayName = isAuthenticated ? profile?.user?.name ?? name : '';
  const authUrl = buildAuthUrl(telegramId, name);

  const linkTelegram = async () => {
    setAuthError('');
    if (!telegramId) {
      setAuthError('Откройте mini app из Telegram, чтобы подтвердить аккаунт.');
      return;
    }
    try {
      setIsLinking(true);
      const response = await fetch(`${API_BASE}/api/tg/link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId, name })
      });
      if (!response.ok) {
        throw new Error('Не удалось связать аккаунт.');
      }
      await fetchAll();
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Ошибка авторизации');
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-grid px-5 pb-20 pt-6 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <TopBar
          name={displayName}
          isAuthenticated={isAuthenticated}
          onProfileClick={() => setIsProfileOpen(true)}
          onAuthClick={() => setIsAuthOpen(true)}
        />

        <section className="fade-up space-y-4">
          <div className="rounded-2xl border border-white/10 bg-panel/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neon2">NeuroPro Mini</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Единый центр обучения в Telegram</h1>
            <p className="mt-2 text-sm text-muted">
              Отслеживайте прогресс, оплаты и новые уроки в одном окне. Все данные синхронизируются с основной
              платформой.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <GlowButton onClick={() => setIsAuthOpen(true)}>Войти</GlowButton>
              <GlowButton variant="ghost" onClick={() => openExternal(FAQ_URL)}>
                FAQ
              </GlowButton>
              <GlowButton variant="ghost" onClick={() => openExternal(SUPPORT_URL)}>
                Поддержка
              </GlowButton>
              <GlowButton variant="ghost" onClick={() => setIsProfileOpen(true)}>
                Личный кабинет
              </GlowButton>
            </div>
          </div>
        </section>

        <section className="fade-up space-y-4">
          <SectionHeader
            eyebrow="Снимок"
            title="Что происходит прямо сейчас"
            description="Краткая статистика по вашим курсам и оплатам."
          />
          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-panel/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Средний прогресс</p>
              <p className="mt-2 text-2xl font-semibold text-white">{averageProgress}%</p>
              <p className="mt-1 text-xs text-muted">Откройте личный кабинет для деталей.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Курсы" value={String(courses.length || 0)} helper="Активные программы" />
              <StatCard label="Оплаты" value={String(payments.length || 0)} helper="Счета и квитанции" />
            </div>
          </div>
        </section>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-5 pb-10 transition-all duration-300 ${
          isAuthOpen ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsAuthOpen(false)}
      >
        <div
          className={`w-full max-w-md rounded-3xl border border-white/10 bg-panel/95 p-6 shadow-glow transition-all duration-300 ${
            isAuthOpen ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neon2">Авторизация</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Вход в mini app</h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
              onClick={() => setIsAuthOpen(false)}
            >
              Закрыть
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-white">Войти через Telegram</p>
              <p className="mt-1 text-xs text-muted">
                Подключим ваш Telegram‑аккаунт и откроем доступ к личному кабинету.
              </p>
              <GlowButton className="mt-3 w-full" onClick={linkTelegram} disabled={isLinking}>
                {isLinking ? 'Подключаем…' : 'Подключить Telegram'}
              </GlowButton>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-white">Нужна регистрация?</p>
              <p className="mt-1 text-xs text-muted">Создайте аккаунт на основной платформе NeuroPro.</p>
              <GlowButton variant="ghost" className="mt-3 w-full" onClick={() => openExternal(authUrl)}>
                Перейти к регистрации
              </GlowButton>
            </div>
            {authError ? <p className="text-xs text-amber-300">{authError}</p> : null}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-5 pb-10 transition-all duration-300 ${
          isProfileOpen ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsProfileOpen(false)}
      >
        <div
          className={`w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-panel/95 p-6 shadow-glow transition-all duration-300 ${
            isProfileOpen ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neon2">Личный кабинет</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Профиль NeuroPro</h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
              onClick={() => setIsProfileOpen(false)}
            >
              Закрыть
            </button>
          </div>

          {!isAuthenticated ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-muted">
              Войдите в систему, чтобы увидеть профиль, покупки и прогресс.
            </div>
          ) : (
            <>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted">Пользователь</p>
                    <p className="text-lg font-semibold text-white">{profile?.user?.name ?? name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Статус</p>
                    <p className="text-sm font-semibold text-neon2">{profile?.user?.status ?? '—'}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="uppercase tracking-[0.2em]">Роль</p>
                    <p className="mt-1 text-sm text-white">{profile?.user?.role ?? '—'}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="uppercase tracking-[0.2em]">Курсы</p>
                    <p className="mt-1 text-sm text-white">{profile?.purchases?.length ?? 0} куплено</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Привилегии</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(profile?.user?.privileges ?? []).map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <section className="mt-6 space-y-4">
                <SectionHeader
                  eyebrow="Личный кабинет"
                  title="Ваш прогресс и ближайшие уроки"
                  description="Следите за курсами, оплатой и расписанием прямо в Telegram."
                />
                <div className="grid gap-3">
                  <ProgressRing percent={averageProgress} label="Средний прогресс по всем курсам" />
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard label="Курсы" value={String(courses.length || 0)} helper="Активные программы" />
                    <StatCard label="Нагрузка" value="5 ч/нед" helper="Рекомендуемый темп" />
                  </div>
                </div>
              </section>

              <section className="mt-6 space-y-4">
                <SectionHeader
                  eyebrow="Активность"
                  title="Последние события"
                  description="Короткая сводка по занятиям и оплатам."
                />
                {loading ? (
                  <div className="rounded-2xl border border-white/10 bg-panel/70 p-4 text-sm text-muted">
                    Загружаем данные…
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activity.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-panel/70 p-4">
                        <p className="text-sm text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-muted">{item.time}</p>
                        <p className="mt-1 text-xs text-muted">{item.meta}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="mt-6 space-y-4">
                <SectionHeader
                  eyebrow="Мои курсы"
                  title="Продолжайте обучение"
                  description="Каждый курс хранит ваш прогресс и заметки ментора."
                />
                <div className="grid gap-4">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </section>

              <section className="mt-6 space-y-4">
                <SectionHeader
                  eyebrow="Оплата"
                  title="Счета и квитанции"
                  description="Контролируйте статус оплат и скачивайте документы."
                />
                <div className="grid gap-4">
                  {payments.map((item) => (
                    <PaymentCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
