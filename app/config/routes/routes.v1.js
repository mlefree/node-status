const admin = require('../../controllers/admin');

module.exports = function (router) {

  router.get('/status',  admin.apiStatus);
  router.post('/update', admin.update);

  return router;

};
