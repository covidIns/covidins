"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/* import Server from './classes/server'; */
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
require('dotenv').config();
/* const server = new Server(); */
const USER = encodeURIComponent(process.env.USER || '');
const PASSWORD = encodeURIComponent(process.env.PASSWORD || '');
const DB_NAME = encodeURIComponent(process.env.DB_NAME || '');
const HOST = process.env.HOST;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;
// Initializations
const app = express_1.default();
//Body Parser
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//configurar Cors
/* app.use( cors({ origin: true, credentials: true })); */
app.use(cors_1.default());
//settings
app.set('port', process.env.PORT || 4000);
//Rutas de mi app
app.use('/user', usuario_1.default);
app.use('/posts', post_routes_1.default);
//conectar db
mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
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