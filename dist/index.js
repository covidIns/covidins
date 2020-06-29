"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
/* import Server from './classes/server'; */
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
/* const server = new Server(); */
// Initializations
const app = express();
//Body Parser
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//configurar Cors
/* app.use( cors({ origin: true, credentials: true })); */
app.use(cors_1.default({ origin: 'http://localhost:8100' }));
//settings
app.set('port', process.env.PORT || 4000);
//Rutas de mi app
app.use('/user', usuario_1.default);
app.use('/posts', post_routes_1.default);
//conectar db
mongoose_1.default.connect('process.env.MONGODB_URI', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
//levantar express
// start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
/* server.start( () => {
    console.log(`Servidor corriendo en puerto 3000`);
}) */