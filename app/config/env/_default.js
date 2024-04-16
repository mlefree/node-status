const path = require('path');
const pkg = require(path.resolve(__dirname, '..', '..', '..', 'package.json'));

const defaultString = (d, v) => {
  return d ? d : v;
};

const defaultArray = (a, v) => {
  if (typeof a === 'string') {
    return a ? a.split(',') : v;
  } else if (v) {
    return a ? a : v;
  } else {
    return a ? a : [];
  }
};

const defaultConfig = {
  deploy: {
    port: defaultString(process.env.PORT, 3210),
    env: defaultString(process.env.NODE_ENV, 'development'),
    version: defaultString(pkg.version, '0.0.0'),
    isInTestMode: (defaultString(process.env.IS_TESTED, 'false') === 'true'),
    isInTraceMode: (defaultString(process.env.TRACE, 'false') === 'true'),
    traceConsoleLevel: (defaultString(process.env.TRACE_CONSOLE_LEVEL, 'info')),
    traceLogLevel: (defaultString(process.env.TRACE_LOG_LEVEL, 'info')),
  }
};

module.exports = { defaultConfig, defaultString, defaultArray };
