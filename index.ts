import express from 'express';
/* import Server from './classes/server'; */
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post.routes';

require('dotenv').config();

/* const server = new Server(); */

const USER=encodeURIComponent(process.env.USER || '');
const PASSWORD=encodeURIComponent(process.env.PASSWORD || '');
const DB_NAME=encodeURIComponent(process.env.DB_NAME || '');
const HOST=process.env.HOST;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;




// Initializations
const app = express();

//Body Parser
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );



//configurar Cors
/* app.use( cors({ origin: true, credentials: true })); */
app.use(cors());

//settings
app.set('port', process.env.PORT || 4000);

//Rutas de mi app
app.use('/user', userRoutes);
app.use('/posts', postRoutes);

//conectar db

mongoose.connect('process.env.MONGODB_URI', { useNewUrlParser: true, useCreateIndex: true}, ( err ) => {
    if ( err ) throw err;
    
    console.log('Base de datos ONLINE')
})

//levantar express

// start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
/* server.start( () => {
    console.log(`Servidor corriendo en puerto 3000`);
}) */