var mongoose=require('mongoose');
var Schema= mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userSchema= new Schema({
	user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pregunta: {
        type: Object,
        
    },
    edad: {
    	type:Number,
    	
    },
    genero: {
    	type:Number,
    	
    },
    rolUsuario: {
    	type:Number,
    	required:true
    }

});
userSchema.methods.encryptPassword=function (password) {
	// body...
	return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
userSchema.methods.validPassword=function (password) {
	// body...
	return bcrypt.compareSync(password,this.password);
};
module.exports=mongoose.model('User',userSchema);