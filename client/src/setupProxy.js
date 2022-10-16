const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://virgo.tucana.org",
      changeOrigin: true,
    })
  );
};
