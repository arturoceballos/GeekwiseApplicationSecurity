var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('login', {});
});

router.post('/login', function(req, res, next) {
    res.render('login', {});
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  res.render('register', {});
});

module.exports = router;