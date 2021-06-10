import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator')

const roles = {
    values: ['ADMIN','USER'],
    message: '{VALUE} no es un rol valido'
}

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre:   { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'Email es necesario'] },
    pass: { type: String, required: [true, 'Pass es necesario'] },
    date: { type: Date, default: Date.now },
    role: { type: String, default: 'USER', enum: roles },
    activo: { type: Boolean, default: true }
})

//VALIDADOR
esquema.plugin(uniqueValidator, {message: 'Error, esperaba {PATH} único'});

// Eliminar pass de respuesta JSON
esquema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.pass;
    return obj;
   }

// Convertir a modelo
const Usuario = mongoose.model('Usuario', esquema);

export default Usuario;