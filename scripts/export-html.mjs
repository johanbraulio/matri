import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const mime = { '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.css': 'text/css', '.js': 'text/javascript' };
const cache = new Map();
async function embed(url, parent = root) {
  if (/^(data:|https?:|#)/.test(url)) return url;
  const file = url.startsWith('/') ? path.join(root, url) : path.resolve(parent, url);
  if (!file.startsWith(root + path.sep)) throw new Error(`Recurso fuera de dist: ${url}`);
  if (cache.has(file)) return cache.get(file);
  let data = await readFile(file);
  const ext = path.extname(file);
  if (ext === '.css') {
    let css = data.toString();
    for (const match of [...css.matchAll(/url\((?:["']?)([^)'"\s]+)(?:["']?)\)/g)]) {
      css = css.replace(match[0], `url("${await embed(match[1], path.dirname(file))}")`);
    }
    data = Buffer.from(css);
  }
  const uri = `data:${mime[ext] || 'application/octet-stream'};base64,${data.toString('base64')}`;
  cache.set(file, uri);
  return uri;
}

let html = await readFile(path.join(root, 'index.html'), 'utf8');
// Todas las referencias de Astro, incluidas srcset y data-gallery-image.
const urls = [...new Set(html.match(/\/_astro\/[^\s"'<>),]+/g) || [])];
for (const url of urls) html = html.replaceAll(url, await embed(url));
html = html.replaceAll('/favicon.svg', await embed('/favicon.svg'));
await mkdir('artifacts', { recursive: true });
const output = path.resolve('artifacts/Invitacion-Johan-y-Marylia.html');
await writeFile(output, html);
console.log(JSON.stringify({ output, bytes: Buffer.byteLength(html), embeddedFiles: cache.size }));
