const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/medical",
    createProxyMiddleware({
      target: `http://localhost:5000`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/rdparty/login",
    createProxyMiddleware({
      target: "http://14.241.182.251:59325",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/statistic/daily/*",
    createProxyMiddleware({
      target: "http://14.241.182.251:59325",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/statistic/data/*",
    createProxyMiddleware({
      target: "http://14.241.182.251:59325",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/system/statistics/*",
    createProxyMiddleware({
      target: "http://14.241.182.251:57195",
      changeOrigin: true,
    })
  );
};
