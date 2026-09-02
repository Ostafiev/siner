/**
 * Собирает из статического экспорта (/out) один самодостаточный HTML:
 * стили, шрифты, скрипты и картинки уезжают внутрь файла.
 * Нужен только для превью по ссылке — на боевом хостинге так делать не надо.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const mime = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

const dataUri = (p) => {
  const abs = path.join(OUT, p.replace(/^\//, "").split("?")[0]);
  if (!fs.existsSync(abs)) return null;
  const type = mime[path.extname(abs).toLowerCase()] || "application/octet-stream";
  return `data:${type};base64,${fs.readFileSync(abs).toString("base64")}`;
};

let html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");

/* 1. стили + шрифты внутри них */
html = html.replace(
  /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (_m, href) => {
    const file = path.join(OUT, href.replace(/^\//, ""));
    if (!fs.existsSync(file)) return "";
    let css = fs.readFileSync(file, "utf8");
    css = css.replace(/url\(([^)]+)\)/g, (m2, raw) => {
      const clean = raw.replace(/['"]/g, "").trim();
      if (clean.startsWith("data:")) return m2;
      const uri = dataUri(clean);
      return uri ? `url(${uri})` : m2;
    });
    return `<style>${css}</style>`;
  },
);

/* 2. preload-и больше не нужны */
html = html.replace(/<link[^>]*rel="preload"[^>]*>/g, "");

/* 3. скрипты — в том же порядке, что и были */
html = html.replace(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g, (_m, src) => {
  const file = path.join(OUT, src.replace(/^\//, ""));
  if (!fs.existsSync(file)) return "";
  // U+FFFD внутри строковых литералов минифицированного чанка меняем на � —
  // смысл тот же, а деплой такие байты не пропускает
  const js = fs.readFileSync(file, "utf8").replace(/�/g, "\\ufffd");
  return `<script>${js}</script>`;
});

/* 4. картинки */
html = html.replace(/(src|srcSet|srcset)="(\/img\/[^"]+)"/g, (m, attr, url) => {
  const uri = dataUri(url);
  return uri ? `${attr}="${uri}"` : m;
});
html = html.replace(/url\((\\?["']?)(\/img\/[^)"'\\]+)\1\)/g, (m, q, url) => {
  const uri = dataUri(url);
  return uri ? `url(${uri})` : m;
});

/* 5. Artifact сам оборачивает контент в скелет документа */
html = html
  .replace(/^[\s\S]*?<head>/i, "")
  .replace(/<\/head>\s*<body[^>]*>/i, "")
  .replace(/<\/body>\s*<\/html>\s*$/i, "");

html = `<title>SINNERGEMS — главная</title>\n${html}`;

fs.mkdirSync("preview", { recursive: true });
fs.writeFileSync("preview/sinnergems.html", html);
console.log("preview/sinnergems.html", (html.length / 1024 / 1024).toFixed(2), "MB");
