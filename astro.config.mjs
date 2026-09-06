import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://johanbraulio.github.io',
  base: process.env.GITHUB_PAGES === 'true' ? '/matri/' : '/',
  output: 'static',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
