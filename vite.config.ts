import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
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
