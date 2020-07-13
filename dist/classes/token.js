"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let Token = /** @class */ (() => {
    class Token {
        constructor() { }
        static getJwtToken(payload) {
            return jsonwebtoken_1.default.sign({
                usuario: payload
            }, this.seed, { expiresIn: this.caducidad });
        }
        static getJwtTokenRegistro(payload) {
            return jsonwebtoken_1.default.sign({
                usuario: payload
            }, this.seed, { expiresIn: this.caducidadTokenRegistro });
        }
        static comprobarToken(userToken) {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
        }
        static comprobarTokenRegistro(userToken) {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
        }
    }
    Token.seed = 'este-es-el-seed-de-mi-app-secreto';
    Token.caducidad = '5d';
    Token.caducidadTokenRegistro = '45m';
    return Token;
})();
exports.default = Token;
