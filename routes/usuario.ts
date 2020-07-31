import { Router, Request, Response, response } from 'express';
import { Usuario } from '../models/usuario.model';
import { Administradores } from '../models/administradores.model';

import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticación';
import bodyParser from 'body-parser';

require('dotenv').config();


const hbs = require('nodemailer-express-handlebars');


const userRoutes = Router();



function enviarMail(emailDestinatario: any, token: number, nombre: string) {

    let nombreUsuario = nombre;
    let transporter = nodemailer.createTransport({  
        pool: true,
        service: 'Gmail',
        auth: {
            type:'OAuth2',    
            user: process.env.EMAIL,
            /* accessToken: 'ya29.a0AfH6SMCZcnrhhGOswkqxZ7eGwopCjcRhOnOSBoG-G9NHMVnO2dcanVtDLjCT5bOL-i4uWM5w0eVu_bS5MdaE7LS5H3KsZVdc-P5DzgZ9ZX2o5UDHfF5M2P9AOrvFlZ8lACZrFzuOj6GfRfmjvOWXnfmoz1fQorWi3ZY',           
            expires: 1594998282749 + 60000, */
            refreshToken: process.env.EMAIL_REFRESH_TOKEN, 
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            /* accessUrl: 'https://oauth2.googleapis.com/token', */

        }

    });    

    /* transporter.use('compile', hbs({
    viewEngine: {
        extName: ".handlebars",
        defaultLayout: false,
    },
    viewPath: './views/'
    })); */    
    const URL_API= process.env.URL_API

    let link = `${URL_API}/user/verify?hash=${token}`; /* ?hash=${hash} */

    let mailOptions = {
        from: process.env.EMAIL,
        to: emailDestinatario,
        subject: 'Verificación de Email',
        /* text: 'Por favor haga click en el siguiente enlace para completar el registro', */
        /* attachments: [
            { filename: 'gna.jpg', path: './assets/gna.jpg'}
        ], */
        /* template: 'index', */
        html: `Hola ${nombreUsuario},<br> Por fabor haga click en el siguiente enlace para verificar su Email y completar su registro en instiSoft.<br><a href="+link+">Click aqui para verificar</a>`
    }

    transporter.verify((error, success) => {
        if(error) return console.log(error)
        console.log('Server is ready to take our message', success)
        transporter.on('token', token => {
            console.log('A new access token was generated');
            console.log('User: %s', token.user);
            console.log('Access Token: %s', token.accessToken);
            console.log('Expires: %s', new Date(token.expires));
        });
    })

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log('Error Occurs', err);
        } else {
            console.log('Email sent!!!');
        }
    });
}


userRoutes.get('/verify', (req: Request, res: Response)=> {
    const hash = req.query
    const hashDefinitivo = Number(hash.hash)
    console.log(hashDefinitivo);

    Usuario.findOne({ hashTokenRegistro: hashDefinitivo } , (err, user) => {
        if(err) throw err;

        if (!user) {
            return res.send(`<h1>Este mail ya no es válido para registrarse, por favor realice su registro nuevamente`);
        } else {
            const usuario = {
                roll: 'admin',
                active: true

            }
            Usuario.findByIdAndUpdate( user._id, usuario,  { new: true }, (err, userDB) => {

                if ( err ) throw err;
        
                if ( !userDB ) {
                    return res.json({
                        ok: false,
                        mensaje: 'No existe un usuario con ese ID'
                    });
                }
        
                const tokenUser = ({
                    _id: userDB._id,
                    active: true,
                    roll: 'admin'
                });
        
                res.send(`<h1>Registro exitoso</h1>`);
        
            });
            
            
        }
    });

})
   

    



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

            
            const emailRegistro = req.body.email;

            const hash = Math.floor((Math.random() *1548596) + 12569874523658);

            enviarMail(emailRegistro, hash, req.body.nombre);

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
                    hashTokenRegistro: userDB.hashTokenRegistro,

                    
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
userRoutes.post('/createAdmin',(req: Request, res: Response ) => {
    const body:any = {
        email: req.body.email
    }
    

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