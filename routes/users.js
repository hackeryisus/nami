var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
router.use(csrfProtection);
/* GET users listing. */
router.get('/nueva-cuenta', function(req, res, next) {
	var messages=req.flash('error');

    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages:messages,
        hasErrors:messages.length > 0,

    });
});
router.post('/nueva-cuenta', passport.authenticate('local.signup', {
    successRedirect: '/usuarios/perfil',
    failureRedirect: '/usuarios/nueva-cuenta',
    failureFlash: true
}));
router.get('/perfil', function(req, res, next) {
    // body...
    console.log(req.user);
    res.render('user/profile');
    	
});
router.post('/ingresar', passport.authenticate('local.signin', {
   
    failureRedirect: '/usuarios/ingresar',
    failureFlash: true
}),function (req,res,next) {
    // body...    
    res.redirect('/usuarios/perfil');
});
router.get('/ingresar',function (req,res,next) {
	// body...
	var messages=req.flash('error');

	
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages:messages,
        hasErrors:messages.length > 0,

    });
});
module.exports = router;