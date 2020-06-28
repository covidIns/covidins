"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//configurar Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_routes_1.default);
//conectar db
mongoose_1.default.connect('mongodb://localhost:27017/covidGen', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
//levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto 3000`);
});
