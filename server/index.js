const configServer = require('./server').default;

const config = {
  port: process.env.PORT || 3001,
  root: process.cwd(),
};

const app = configServer(config);
exports.default = app;
