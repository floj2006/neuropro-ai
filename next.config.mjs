/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Отключаем статическую генерацию для динамических маршрутов в dev
  onDemandEntries: {
    // Период неактивности перед очисткой страниц
    maxInactiveAge: 60 * 1000,
    // Количество страниц для хранения
    pagesBufferLength: 5
  }
};

export default nextConfig;
