import { Schema, Document, model} from 'mongoose';

const administradoresSchema = new Schema ({

    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String
    }
});

administradoresSchema.pre<IPost>('Save', function( next) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created : Date;
    email  : String;
}

export const Administradores = model<IPost>('Administradores', administradoresSchema);