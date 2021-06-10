const control ={}

const Modelo = require('../models/Producto')

control.ver_todos = async (req, res)=>{
const datos = await Modelo.find();
await res.json(datos)
}

control.guardar = async (req, res)=>{
const datos = req.body;
const modelo = new Modelo(datos)
await modelo.save()
res.send('Guardado correctamente')
}

control.eliminar= async (req, res)=>{
const id = req.params.id;
await Modelo.remove({_id: id})
res.send('Eliminado correctamente')
}

control.editar= async (req, res)=>{
const id = req.params.id;
const datos = req.body;
await Modelo.update({_id:id}, datos)
res.send('Actualizado correctamente')
}

module.exports = control