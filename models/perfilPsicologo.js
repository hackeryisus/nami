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

module.exports=mongoose.model('PerfilPsicologo',psicologoSchema);