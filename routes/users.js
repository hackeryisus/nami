var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
var PerfilPsicologo=require('../models/perfilPsicologo');
router.use(csrfProtection);

router.get('/perfil',isLoggedIn, function(req, res, next) {
    // body...
    console.log(req.user.rolUsuario);
    if (req.user.rolUsuario == 0) {
    	res.render('user/profile');

    }else{
    	res.render('user/psicologo');
    }
   
    	
});
router.get('/salir',isLoggedIn,function (req,res) {
	// body...
	req.logout();
	res.redirect('/')

});
router.get('/asociar-usuario',isLoggedIn,function (req,res) {
	// body...
	res.render('user/asociarUsuario');
});
router.post('/asociar-usuario',isLoggedIn,function (req,res) {
	// body...
	PerfilPsicologo.findOne({
		idPsicologo:req.user
	},function (err,perfil) {
		// body...
		if (err) {
			throw err;

		}
		if(perfil){
			return route('/asociar-usuario',req.flash('error','El usuario ya se encuentra asignado'));
		}
		var perfil=new PerfilPsicologo();
		var idPacientes=[];
		idPacientes.push(req.body.codigo);
		perfil.idPsicologo=req.user;
		//perfil.
	});
});


router.use('/',notLoggedIn,function (req,res,next) {
	// body...
	next();
});
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


router.post('/ingresar', passport.authenticate('local.signin', {
   	successRedirect: '/usuarios/perfil',
    failureRedirect: '/usuarios/ingresar',
    failureFlash: true
}));
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

function isLoggedIn(req,res,next){
    // body...
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/usuarios/ingresar');
}
function notLoggedIn(req,res,next){
    // body...
    //isAuthenticated metodo de passport
    if (!req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl=req.url;
    res.redirect('/');
}