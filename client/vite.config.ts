// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import sass from 'sass';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      sass: {
        implementation: sass,
      },
    },
  },
});
