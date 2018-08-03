const env = process.env.NODE_ENV || 'development';
export const isProduction = env === 'production';
export const isDebug = env === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? 'http://localhost:3001' : 'http://nightl.kmamgt7twa.eu-west-3.elasticbeanstalk.com';
