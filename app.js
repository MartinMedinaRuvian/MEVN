import express from 'express'
import morgan from 'morgan'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import history from 'connect-history-api-fallback'

import cliente_rutas from './routers/cliente_rutas'
import producto_rutas from './routers/producto_rutas'
import usuario_rutas from './routers/usuarios_rutas'
import login_rutas from './routers/login_rutas'

const app = express()

//Mildewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


//Configuro la conexion a la db
const uri = "mongodb+srv://admin:123abc@cluster0-55o46.mongodb.net/yoli?retryWrites=true&w=majority";
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

// Or using promises
mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Conectado a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);

//Rutas
app.use('/api/cliente', cliente_rutas)
app.use('/api/producto', producto_rutas)
app.use('/api/usuario', usuario_rutas);
app.use('/api/login', login_rutas);


//Configuro y preparo el puerto en el server
app.set('port', process.env.PORT || 3000)
const puerto = app.get('port')

app.listen(puerto, ()=>{
    console.log('Servidor corriendo en el puerto '+puerto)
})