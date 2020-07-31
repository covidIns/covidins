
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario' ]
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es necesaria']
    },
    roll: {
        type: String,
        default: 'standart'
    },

    unidadAcademica: {
        type: String,
        required: [ true, 'La unidad académica es requerida']
    },

    active: {
        type: Boolean,
        default: false
    },

    hashTokenRegistro: {
        type: Number,
    }
    

});


usuarioSchema.method('compararPassword', function( password: string = ''): boolean {

    if (  bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});



interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    roll: string;
    avatar: string;
    unidadAcademica: string;
    active: Boolean;
    hashTokenRegistro: number

    compararPassword(password: string): boolean;
}



export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
