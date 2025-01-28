const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/shop', createProxyMiddleware({
  target: 'http://156.67.74.51',
  changeOrigin: true,
  pathRewrite: {
    '^/shop': '/shop',
  },
}));

app.listen(3001, () => {
  console.log('Proxy server running on port 3001');
}); 