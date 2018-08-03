const createServer = require('./server').default;

const config = {
  port: process.env.PORT || 3001,
  root: process.cwd(),
};

const app = createServer().withConfig(config);
exports.default = app;
