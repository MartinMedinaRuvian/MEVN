import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: {type:String, required:[true,'Ingrese el nombre']},
    telefono: String,
    debe: Number 
})

const cliente = mongoose.model('Cliente', esquema)

module.exports = cliente