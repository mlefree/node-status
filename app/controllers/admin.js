const path = require('path');
const config = require('../config');
const { logger } = require('../factories/logger');
const AbstractController = require('./abstract');
const axios = require('axios');
const { OSMetrics } = require('mle-tools-node');

class AdminController extends AbstractController {

  constructor () {
    super();
    throw 'not used : used as static';
  }

  static async apiStatus (req, res) {
    try {
      const status = await AdminController.BuildSummarizedStatus();
      if (status.ok) {
        return res.status(200).jsonp(status);
      }

      logger.error('bad status:', status);

    } catch (e) {
      logger.error(e);
    }

    return res.status(500).send();
  }

  static async update (req, res) {
    logger.warn('#UPDATE app with "npm run update"...');
    const npmRun = require('npm-run');
    const version = require(path.resolve(__dirname, '../../', 'package.json')).version;
    npmRun.exec('npm run update', {}, async function (err, stdout, stderr) {
      logger.warn('#UPDATE update: ', err, stdout, stderr);
      logger.warn('#UPDATE now, shutdown...');
      process.exit(0);
    });
    return res.status(200).send('update from version: ' + version + ' to HEAD ...');
  }

  static async BuildSummarizedStatus (req, res) {

    let ok = true;
    const os = {};
    try {
      const metrics = await OSMetrics.getMetrics();
      const hostname = metrics.name;
      os[hostname] = {
        cpu: metrics.cpuPercent,
        mem: metrics.memory2Percent,
        disk: metrics.diskPercent,
      };
    } catch (e) {
      logger.error(e);
      ok = false;
    }

    return {
      version: '' + config.deploy.version,
      env: '' + config.deploy.env,
      os,
      ok
    };
  }


  static GetUrlVersion (config) {
    let urlVersion = '';
    if (config.deploy.version.indexOf('1.') === 0) {
      urlVersion = 'v1';
    } else if (config.deploy.version.indexOf('2.') === 0) {
      urlVersion = 'v2';
    } else if (config.deploy.version.indexOf('test') === 0) {
      urlVersion = 'test';
    }
    return urlVersion;
  }

}

module.exports = AdminController;
