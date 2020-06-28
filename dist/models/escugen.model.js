"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escugen = void 0;
const mongoose_1 = require("mongoose");
const escugenSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
escugenSchema.pre('Save', function (next) {
    this.created = new Date();
    next();
});
exports.Escugen = mongoose_1.model('Escugen', escugenSchema);
