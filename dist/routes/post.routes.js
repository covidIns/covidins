"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticaci_n_1 = require("../middlewares/autenticaci\u00F3n");
const post_model_1 = require("../models/post.model");
const escugen_model_1 = require("../models/escugen.model");
const escusub_model_1 = require("../models/escusub.model");
const escusuper_model_1 = require("../models/escusuper.model");
const insbarreal_model_1 = require("../models/insbarreal.model");
const inscaes_model_1 = require("../models/inscaes.model");
const diredtos_model_1 = require("../models/diredtos.model");
const postRoutes = express_1.Router();
//traer Post de la base
postRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .limit(1)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
postRoutes.get('/escugen', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield escugen_model_1.Escugen.find()
        .sort({ _id: -1 })
        .limit(1)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
postRoutes.get('/escusub', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield escusub_model_1.Escusub.find()
        .sort({ _id: -1 })
        .limit(1)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
postRoutes.get('/escusuper', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield escusuper_model_1.Escusuper.find()
        .sort({ _id: -1 })
        .limit(1)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
postRoutes.get('/insbarreal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield insbarreal_model_1.Insbarreal.find()
        .sort({ _id: -1 })
        .limit(1)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
postRoutes.get('/inscaes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield inscaes_model_1.Inscaes.find()
        .sort({ _id: -1 })
        .limit(1)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
postRoutes.get('/diredtos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield diredtos_model_1.Diredtos.find()
        .sort({ _id: -1 })
        .limit(1)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
postRoutes.post('/', [autenticaci_n_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    post_model_1.Post.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
postRoutes.post('/escugen', [autenticaci_n_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    escugen_model_1.Escugen.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
postRoutes.post('/escusub', [autenticaci_n_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    escusub_model_1.Escusub.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
postRoutes.post('/escusuper', [autenticaci_n_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    escusuper_model_1.Escusuper.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
postRoutes.post('/insbarreal', [autenticaci_n_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    insbarreal_model_1.Insbarreal.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
postRoutes.post('/inscaes', [autenticaci_n_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    inscaes_model_1.Inscaes.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
postRoutes.post('/diredtos', [autenticaci_n_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    diredtos_model_1.Diredtos.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
exports.default = postRoutes;
