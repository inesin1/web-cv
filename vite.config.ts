import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const root = import.meta.dirname;

const trailingSlashRedirect: Plugin = {
  name: 'trailing-slash-redirect',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url ?? '';
      const [path, query] = url.split('?');
      if (!path || path.endsWith('/') || path.includes('.')) {
        next();
        return;
      }
      const candidate = resolve(root, path.slice(1), 'index.html');
      if (existsSync(candidate)) {
        const location = path + '/' + (query ? '?' + query : '');
        res.writeHead(301, { Location: location });
        res.end();
        return;
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), trailingSlashRedirect],
  appType: 'mpa',
  resolve: {
    alias: { '@': resolve(root, 'src') },
  },
  build: {
    rolldownOptions: {
      input: {
        main: resolve(root, 'index.html'),
        minimal: resolve(root, 'variants/minimal/index.html'),
        terminal: resolve(root, 'variants/terminal/index.html'),
        contacts: resolve(root, 'contacts/index.html'),
      },
    },
  },
});
