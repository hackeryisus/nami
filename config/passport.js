var passport = require('passport');
var User = require('../models/users');
var localStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
    // body...
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    // body...
    User.findById(id, function(err, user) {
        // body...
        done(err, user);
    });
});
passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    // body...
    var rol=parseInt(req.body.rol);
    var errors=null;
    if (rol == 0) {
    	req.checkBody('username','Usuario invalido').notEmpty();
    	req.checkBody('password','Password invalido').notEmpty().isLength({min:4});
    	req.checkBody('genero','Debes seleccionar un genero').notEmpty();
    	req.checkBody('edad','Debes seleccionar edad').notEmpty();
    	req.checkBody('pregunta','Debes seleccionar una pregunta').notEmpty();
    	errors=req.validationErrors();
    	if (errors) {
    		var messages=[];
    		errors.forEach(function(error) {
    			// body...
    			messages.push(error.msg);
    		});
    		return done(null,false,req.flash('error',messages));
    	}
    	
    }else{
    	req.checkBody('username','Usuario invalido').notEmpty();
    	req.checkBody('password','Password invalido').notEmpty().isLength({min:4});
    	errors=req.validationErrors();
    	if (errors) {
    		var messages=[];
    		errors.forEach(function(error) {
    			// body...
    			messages.push(error.msg);
    		});
    		return done(null,false,req.flash('error',messages));
    	}
    }
    

    User.findOne({
        'user': username
    }, function(err, user){
        // body...
        console.log('\n'+req.body.rol+'\n');
        if (err) {
            return done(err);
            
        }
        if (user) {
            //done (sin errores,no regresa objeto de la db)
            return done(null, false, {
                //variable de sesion errores
                message: 'El usuario ya existe =( '
            });
           
        }
        var newUser = new User();
        
        if (rol == 0) {
            newUser.user = username;
            newUser.password = newUser.encryptPassword(password);
            newUser.edad = parseInt(req.body.edad);
            newUser.genero = parseInt(req.body.genero);
            newUser.pregunta = {
                frutaColor: req.body.pregunta
            };
            newUser.rolUsuario = rol;
            //console.log('\n 1'+newUser);
            newUser.save(function(err, result) {
                // body...
                if (err) {
                    return done(err);
                 
                }
                return done(null, newUser);
                console.log('aqui merengues 1');
            }); 
        } else {
            newUser.user = user;
            newUser.password = newUser.encryptPassword(password);
            newUser.rolUsuario = req.body.rol;
            //console.log('\n 2'+newUser);
            newUser.save(function(err, result) {
                // body...
                if (err) {
                    return done(err);
                 
                }	
                
                return done(null, newUser);
            });
        }
    });
}));

passport.use('local.signin',new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},function (req,username,password,done) {
    // body...
    req.checkBody('username','Usuario invalido').notEmpty();
    req.checkBody('password','Password invalido').notEmpty();
    //.isLenght({min:4});
    var errors=req.validationErrors();
    if (errors) {
        var messages=[];
        errors.forEach(function (error) {
            // body...
            messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));
    }
    User.findOne({
        'user': username
    }, function(err, user) {
        // body...
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Usuario no encontrado.'
            });
        }
        if (!user.validPassword(password)){
            return done(null, false, {
                message: 'Password incorrecto.'
            });
        }
        return done(null,user);
    });
}));