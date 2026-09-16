import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const mime = { '.mp3': 'audio/mpeg', '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.css': 'text/css', '.js': 'text/javascript' };
const cache = new Map();
async function embed(url, parent = root) {
  if (/^(data:|https?:|#)/.test(url)) return url;
  const decoded = decodeURIComponent(url);
  const file = decoded.startsWith('/') ? path.join(root, decoded) : path.resolve(parent, decoded);
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

const input = path.resolve(root, process.argv[2] || 'index.html');
if (!input.startsWith(root + path.sep)) throw new Error('La entrada debe estar dentro de dist.');
let html = await readFile(input, 'utf8');
// Una única versión WebP por foto evita adjuntar todas las variantes responsivas.
html = html.replace(/<source\b[^>]*>/g, '').replace(/\s+srcset="[^"]*"/g, '');
// Todas las referencias de Astro, incluidas srcset y data-gallery-image.
const urls = [...new Set(html.match(/\/_astro\/[^\s"'<>),]+/g) || [])];
for (const url of urls) html = html.replaceAll(url, await embed(url));
html = html.replaceAll('/favicon.svg', await embed('/favicon.svg'));
await mkdir('artifacts', { recursive: true });
const output = path.resolve('artifacts', process.argv[3] || 'Invitacion-Johan-y-Marylia.html');
if (!output.startsWith(path.resolve('artifacts') + path.sep)) throw new Error('La salida debe estar dentro de artifacts.');
await writeFile(output, html);
console.log(JSON.stringify({ output, bytes: Buffer.byteLength(html), embeddedFiles: cache.size }));
