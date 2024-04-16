const defaultConfig = require('./_default').defaultConfig;
const defaultString = require('./_default').defaultString;
const defaultArray = require('./_default').defaultArray;

defaultConfig.deploy.isInTestMode = true; // disable server port listener
defaultConfig.deploy.isInTraceMode = true;
defaultConfig.deploy.traceConsoleLevel = 'debug';
defaultConfig.deploy.traceLogLevel = 'debug';


module.exports = defaultConfig;
