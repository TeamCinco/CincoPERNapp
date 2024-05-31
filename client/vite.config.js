import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        onError(err, req, res) {
          console.error('Proxy error:', err);
        },
        onProxyReq(proxyReq, req, res) {
          console.log('Proxy request:', req.url);
        },
        onProxyRes(proxyRes, req, res) {
          console.log('Proxy response:', proxyRes.statusCode);
        },
      },
    },
  },
});
