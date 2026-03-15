import { auth } from './lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  // Публичные маршруты
  const publicRoutes = [
    '/',
    '/about',
    '/contact',
    '/courses',
    '/auth/signin',
    '/auth/signup'
  ];

  // Маршруты, доступные только авторизованным
  const protectedRoutes = [
    '/dashboard',
    '/courses/*/buy',
    '/courses/*/success'
  ];

  // Маршруты, доступные только администраторам
  const adminRoutes = [
    '/admin'
  ];

  // Проверяем, является ли маршрут защищённым
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.includes('*')) {
      const pattern = route.replace('*', '[^/]+');
      return new RegExp(`^${pattern}`).test(nextUrl.pathname);
    }
    return nextUrl.pathname.startsWith(route);
  });

  // Проверяем, является ли маршрут админским
  const isAdminRoute = adminRoutes.some(route =>
    nextUrl.pathname.startsWith(route)
  );

  // Если маршрут админский, проверяем роль
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/signin', nextUrl));
    }
    if (user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
  }

  // Если маршрут защищённый и пользователь не авторизован
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl));
  }

  // Если пользователь авторизован и пытается зайти на страницу входа
  if (nextUrl.pathname === '/auth/signin' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
