//aqil-volunteering/frontend/server.js
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

app.use(
  '/api',
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyReq(proxyReq, req, res) {
      console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${BACKEND_URL}`);
    },
    onError(err, req, res) {
      console.error('[PROXY ERROR]', err.message);
      res.status(500).send('Proxy error');
    },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`🚀 Frontend server running at http://localhost:${PORT}`);
  console.log(`🔗 Proxying /api requests to: ${BACKEND_URL}`);
});
