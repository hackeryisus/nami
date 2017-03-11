var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio' });
});

/* GET home page. */
router.get('/tutor', function(req, res, next) {
  res.render('tutor', { title: 'Tutor' });
});

/* GET home page. */
router.get('/nosotros', function(req, res, next) {
  res.render('about', { title: 'Acerca de' });
});

module.exports = router;
