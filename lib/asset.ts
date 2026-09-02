/**
 * Префикс для статики.
 *
 * На своём домене пусто, и пути остаются как есть: /img/hero.jpg
 * На GitHub/GitLab Pages сайт лежит в подпапке, и туда же нужно
 * префиксовать картинки — Next сам это делает только для next/image и ссылок.
 *
 * Значение задаётся при сборке переменной NEXT_PUBLIC_BASE_PATH.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
