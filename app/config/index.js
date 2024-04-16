let config = {};
if (process.env.NODE_ENV === 'test') {
  config = require('./env/test');
} else if (process.env.NODE_ENV === 'production') {
  config = require('./env/production');
} else if (process.env.NODE_ENV === 'sandbox') {
  config = require('./env/sandbox');
} else {
  config = require('./env/development');
}


console.log('### App configEnv: ', process.env.NODE_ENV, JSON.stringify(config));
module.exports = config;
