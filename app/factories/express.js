const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const serverTiming = require('server-timing');


const config = require('../config');
const { logger } = require('../factories/logger');

const _app = express();

module.exports = (function () {

  logger.info('App trace enabled: ', config.deploy.isInTraceMode);
  logger.info('App version: ', config.deploy.env, config.deploy.version);

  if (config.deploy.isInTraceMode) {
    const log = {
      stream: {
        write: function (message) {
          return logger.debug('Express debug: ', message);
        },
      },
    };
    _app.use(morgan('tiny', log));
  }

  _app.use(compression());
  _app.use(serverTiming());

  const eRouter = express.Router();
  if (config.deploy.version.indexOf('1.') === 0) {
    const routerV1 = require('../config/routes/routes.v1')(eRouter);
    _app.use('/v1', routerV1);
  } else if (config.deploy.version.indexOf('2.') === 0) {
    const routerV1 = require('../config/routes/routes.v1')(eRouter);
    const routerV2 = require('../config/routes/routes.v2')(eRouter);
    _app.use('/v1', routerV1);
    _app.use('/v2', routerV2);
  } else if (config.deploy.version.indexOf('3.') === 0) {
    const routerV2 = require('../config/routes/routes.v2')(eRouter);
    const routerV3 = require('../config/routes/routes.v3')(eRouter);
    _app.use('/v2', routerV2);
    _app.use('/v3', routerV3);
  }

  _app.use(function (req, res, next) {
    res.status(404).send();
  });

  logger.info('App routed.');

  return _app;
})();
