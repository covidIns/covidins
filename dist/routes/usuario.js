"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const administradores_model_1 = require("../models/administradores.model");
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticaci_n_1 = require("../middlewares/autenticaci\u00F3n");
require('dotenv').config();
const userRoutes = express_1.Router();
userRoutes.post('/prueba', (req, res) => {
    console.log('esta es una prueba');
});
userRoutes.post('/send', (req, res) => {
    let transporter = nodemailer_1.default.createTransport({
        pool: true,
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            /* accessToken: 'ya29.a0AfH6SMCZcnrhhGOswkqxZ7eGwopCjcRhOnOSBoG-G9NHMVnO2dcanVtDLjCT5bOL-i4uWM5w0eVu_bS5MdaE7LS5H3KsZVdc-P5DzgZ9ZX2o5UDHfF5M2P9AOrvFlZ8lACZrFzuOj6GfRfmjvOWXnfmoz1fQorWi3ZY',
            expires: 1594998282749 + 60000, */
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: 'marcosmatiaslopez.2018@gmail.com',
        subject: 'Verificación de Email',
        text: 'Por favor haga click en el siguiente enlace para completar el registro'
    };
    transporter.verify((error, success) => {
        if (error)
            return console.log(error);
        console.log('Server is ready to take our message', success);
        transporter.on('token', token => {
            console.log('A new access token was generated');
            console.log('User: %s', token.user);
            console.log('Access Token: %s', token.accessToken);
            console.log('Expires: %s', new Date(token.expires));
        });
    });
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
        }
        else {
            console.log('Email sent!!!');
        }
    });
});
// Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario y/o contraseña incorrectas'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar,
                roll: userDB.roll,
                unidadAcademica: userDB.unidadAcademica,
                active: userDB.active
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
    });
});
// Crear un usuario
userRoutes.post('/create', (req, res) => {
    administradores_model_1.Administradores.findOne({ email: req.body.email }, (err, user) => {
        if (err)
            throw err;
        if (!user) {
            res.json({
                ok: false,
                mensaje: 'El usuario no está prmitido que se registre app privada'
            });
        }
        else {
            const hash = Math.floor((Math.random() * 1548596) + 12569874523658);
            const user = {
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcrypt_1.default.hashSync(req.body.password, 10),
                avatar: req.body.avatar,
                roll: req.body.roll,
                unidadAcademica: req.body.unidadAcademica,
                active: req.body.active,
                hashTokenRegistro: hash
            };
            usuario_model_1.Usuario.create(user).then(userDB => {
                const tokenUser = {
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    email: userDB.email,
                    avatar: userDB.avatar,
                    roll: userDB.roll,
                    unidadAcademica: userDB.unidadAcademica,
                    active: userDB.active,
                    hashTokenRegistro: userDB.hashTokenRegistro
                };
                res.json({
                    ok: true,
                    token: tokenUser
                });
            }).catch(err => {
                res.json({
                    ok: false,
                    err
                });
            });
        }
    });
});
//crearNuevoAdministrador
userRoutes.post('/createAdmin', (req, res) => {
    const body = {
        email: req.body.email
    };
    administradores_model_1.Administradores.create(body).then(adminDB => {
        const email = {
            email: adminDB.email
        };
        res.json({
            ok: true,
            email
        });
    }).catch(err => {
        res.json({
            ok: false,
            post: err
        });
    });
});
// Actualizar usuario
userRoutes.post('/update', autenticaci_n_1.verificaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
userRoutes.get('/', [autenticaci_n_1.verificaToken], (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});
exports.default = userRoutes;
