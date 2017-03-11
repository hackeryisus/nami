var mongoose=require('mongoose');
var Schema= mongoose.Schema;

var psicologoSchema= new Schema({
	idPsicologo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pacientes:{
    	type:[Schema.Types.Mixed]
    }

});
psicologoSchema.methods.stringToObject=function (str) {
	// body...
	return mongoose.Types.ObjectId(str);
}
module.exports=mongoose.model('PerfilPsicologo',psicologoSchema);