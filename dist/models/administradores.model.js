"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administradores = void 0;
const mongoose_1 = require("mongoose");
const administradoresSchema = new mongoose_1.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String
    }
});
administradoresSchema.pre('Save', function (next) {
    this.created = new Date();
    next();
});
exports.Administradores = mongoose_1.model('Administradores', administradoresSchema);
