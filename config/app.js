const axios = require('axios');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const isDebug = env === 'development';
const isClient = typeof window !== 'undefined';
const basename = '';
const apiEndpoint = isDebug ? `http://localhost:3001${basename}` : `http://nightl.kmamgt7twa.eu-west-3.elasticbeanstalk.com${basename}`;
const axiosInstance = axios.create({
  baseURL: apiEndpoint,
  headers: { 'cache-control': 'no-cache' },
});

module.exports = {
  isProduction,
  isDebug,
  isClient,
  basename,
  apiEndpoint,
  axiosInstance,
};
