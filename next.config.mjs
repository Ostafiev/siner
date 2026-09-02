/** @type {import('next').NextConfig} */

// Для GitHub / GitLab Pages сайт живёт в подпапке (/имя-репозитория),
// поэтому пути к стилям и картинкам нужно префиксовать. На своём домене
// переменная не задаётся и префикса нет.
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  // STATIC_EXPORT=1 next build -> статичная сборка в /out
  // (нужна для Pages и любого хостинга без Node)
  ...(process.env.STATIC_EXPORT
    ? { output: "export", images: { unoptimized: true }, trailingSlash: true }
    : {}),
};

export default nextConfig;
