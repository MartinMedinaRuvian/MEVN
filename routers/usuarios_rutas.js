var express = require('express');
var router = express.Router();

// Importamos modelo Tarea
import User from '../models/Usuario';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

const _= require('underscore');

const {verificarAuth, verificaRol} = require('../middlewares/autenticacion');

router.post('/guardar', [verificarAuth, verificaRol], async (req, res) => {

  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role
  }

  body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

  try {

    const userDB = await User.create(body);

    return res.json(userDB);
    
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }

});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});






router.put('/usuario/:id', [verificarAuth, verificaRol], async(req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'pass']);
    if(body.pass){
      body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }
  
    try {
      // {new:true} nos devuelve el usuario actualizado
      const usuarioDB = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true});
  
      return res.json(usuarioDB);
  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  
  });


  router.get('/usuario/:id', [verificarAuth, verificaRol], async(req, res) => {

    let id = req.params.id;
  
    try {
  
      const usuarioDelete = await User.findByIdAndRemove(id);
  
      if(!usuarioDelete){
        return res.status(400).json({
          mensaje: 'Usuario no encontrado'
        })
      }
  
      return res.json(usuarioDelete);
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  
  });


module.exports = router;