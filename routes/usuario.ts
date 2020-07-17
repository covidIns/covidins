import { Router, Request, Response, response } from 'express';
import { Usuario } from '../models/usuario.model';
import { Administradores } from '../models/administradores.model';

import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticación';

const userRoutes = Router();




// Login
userRoutes.post('/login', (req: Request, res: Response ) => {

    const body = req.body;

    Usuario.findOne({ email: body.email }, ( err, userDB ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario y/o contraseña incorrectas'
            });
        }

        if ( userDB.compararPassword( body.password ) ) {

            const tokenUser = Token.getJwtToken({
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

        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }


    })


});



// Crear un usuario
userRoutes.post('/create', ( req: Request, res: Response ) => {


    Administradores.findOne({email : req.body.email }, (err, user) => {
        if(err) throw err;
        if(!user){
            res.json({
                ok: false,
                mensaje: 'El usuario no está prmitido que se registre app privada'
            })
        } else {

            const hash = Math.floor((Math.random() *1548596) + 12569874523658)

            const user = {
                nombre   : req.body.nombre,
                email    : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10),
                avatar   : req.body.avatar,
                roll     : req.body.roll,
                unidadAcademica: req.body.unidadAcademica,
                active: req.body.active,
                hashTokenRegistro: hash
                
            };
        
            Usuario.create( user ).then( userDB => {
        
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
        
        
            }).catch( err => {
                res.json({
                    ok: false,
                    err
                });
            });
        }

    })
});

//crearNuevoAdministrador
userRoutes.post('/createAdmin',(req: any, res: Response ) => {
    const body = req.body;
    body.email = req.email


    Administradores.create( body ).then(adminDB => {

        const email = {
            email: adminDB.email
        }

        res.json({
            ok: true,
            email
        })
        
    }).catch (err => {
        res.json({
            ok: false,
            post: err
        })

    })


})


// Actualizar usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email : req.body.email  || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
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

userRoutes.get('/', [ verificaToken ], (req: any, res: Response) => {
    
    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });
});


export default userRoutes;