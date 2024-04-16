const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    log.logAppInfo('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function(req, res) {
    res.send('Tests home page');
});
// define the about route
router.get('/about', function(req, res) {
    res.send('About tests');
});

module.exports = router;
