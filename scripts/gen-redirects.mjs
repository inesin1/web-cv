import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const redirects = [
  { path: 'github', url: 'https://github.com/inesin1', label: 'GitHub' },
  { path: 'gh', url: 'https://github.com/inesin1', label: 'GitHub' },
  { path: 'tg', url: 'https://t.me/kurtr2d', label: 'Telegram' },
  { path: 'linkedin', url: 'https://www.linkedin.com/in/inesin/', label: 'LinkedIn' },
  { path: 'in', url: 'https://www.linkedin.com/in/inesin/', label: 'LinkedIn' },
  { path: 'email', url: 'mailto:artyom@nesin.dev', label: 'Email' },
  { path: 'cv', url: '/cv.pdf', label: 'CV (PDF)' },
  { path: 'cal', url: 'https://calendly.com/artem-nesin', label: 'Calendly' },
];

const publicDir = resolve(import.meta.dirname, '..', 'public');

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const html = ({ url, label }) => {
  const u = escapeHtml(url);
  const l = escapeHtml(label);
  const display = escapeHtml(url.replace(/^https?:\/\//, ''));
  const scriptUrl = JSON.stringify(url).replace(/<\/script/gi, '<\\/script');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecting to ${l}…</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${u}" />
    <meta http-equiv="refresh" content="0; url=${u}" />
    <script>window.location.replace(${scriptUrl});</script>
  </head>
  <body>
    <p>Redirecting to <a href="${u}">${display}</a>…</p>
  </body>
</html>
`;
};

for (const r of redirects) {
  const file = resolve(publicDir, r.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html(r));
  console.log(`✓ /${r.path} → ${r.url}`);
}
