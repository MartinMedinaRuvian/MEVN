const control ={}

const Modelo = require('../models/Cliente')

control.ver_todos = async (req, res)=>{
try {
    const datos = await Modelo.find();
await res.json(datos)
} catch (error) {
    return res.status(500).send(error);
}
}

control.guardar = async (req, res)=>{
    const datos = req.body;  
    try {
      const modelo = new Modelo(datos)
      await modelo.save()
      res.send('Guardado correctamente')
    } catch (error) {
      return res.status(500).send(error);
    }
}

control.eliminar= async (req, res)=>{
const id = req.params.id;
try {
    await Modelo.remove({_id: id})
res.send('Eliminado correctamente')
} catch (error) {
    return res.status(500).send(error);
}
}

control.editar= async (req, res)=>{
const id = req.params.id;
const datos = req.body;
try {
    await Modelo.update({_id:id}, datos)
res.send('Actualizado correctamente')
} catch (error) {
    return res.status(500).send(error);
}
}

module.exports = control