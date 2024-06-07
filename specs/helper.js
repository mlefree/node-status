const $app = require('../app');
const request = require('supertest');
const { logger } = require('../app/factories/logger');

exports.$app = $app;
exports.request = request;
exports.logger = logger;

