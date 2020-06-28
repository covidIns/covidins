import { Schema, Document, model} from 'mongoose';

const diredtosSchema = new Schema ({

    created: {
        type: Date,
        default: Date.now
    },
    cantidadPositivos: {
        type: Number,
        default: 0
    },
    cantidadSospechosos: {
        type: Number,
        default: 0
    },
    cantidadRecuperados: {
        type: Number,
        default: 0
    },
    cantidadFallecidos: {
        type: Number,
        default: 0
    },
    cantidadInternados: {
        type: Number,
        default: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario']
    }
});

diredtosSchema.pre<IPost>('Save', function( next) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created            : Date;
    cantidadPositivos  : Number;
    cantidadSospechosos: Number;
    cantidadRecuperados: Number;
    cantidadFallecidos : Number;
    cantidadInternados : Number;
    usuario: String
}

export const Diredtos = model<IPost>('Diredtos', diredtosSchema);