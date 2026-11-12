import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Code splitting : Firebase chargé dans son propre chunk, pas dans le bundle principal
          // Résultat : le premier paint ne charge plus le SDK Firebase complet (~250KB)
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
            'vendor-lucide': ['lucide-react'],
          },
        },
      },
      // Avertissements si un chunk dépasse 500KB
      chunkSizeWarningLimit: 500,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
