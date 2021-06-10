import mongoose from 'mongoose'
const Schema = mongoose.Schema

const esquema = new Schema({
descripcion:String,
codigo:{type:String, required:[true, 'Ingrese un codigo']},
cantidad:Number,
costo:Number,
precio:Number
})

const Producto = mongoose.model('Producto', esquema)
module.exports = Producto
