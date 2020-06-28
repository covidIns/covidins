import { Router, Response } from "express";
import { verificaToken } from '../middlewares/autenticación';
import { Post } from '../models/post.model';
import { Escugen } from '../models/escugen.model';
import { Escusub } from '../models/escusub.model';
import { Escusuper } from '../models/escusuper.model';
import { Insbarreal } from '../models/insbarreal.model';
import { Inscaes } from '../models/inscaes.model';
import { Diredtos } from '../models/diredtos.model';

const postRoutes = Router();


//traer Post de la base
postRoutes.get('/', async (req: any, res: Response) => {
   


     const posts = await Post.find()
                             .sort({ _id: -1})                             
                             .limit(1)
                             .populate('usuario', '-password')
                             .exec();
    
    res.json({
     ok: true,
     posts
    });
});
postRoutes.get('/escugen', async (req: any, res: Response) => {
   


     const posts = await Escugen.find()
                             .sort({ _id: -1})                             
                             .limit(1)
                             .populate('usuario', '-password')
                             .exec();
    res.json({
     ok: true,
     posts
    });
});
postRoutes.get('/escusub', async (req: any, res: Response) => {
   


     const posts = await Escusub.find()
                             .sort({ _id: -1})                             
                             .limit(1)
                             .populate('usuario', '-password')
                             .exec();
    res.json({
     ok: true,
     posts
    });
});
postRoutes.get('/escusuper', async (req: any, res: Response) => {
   


     const posts = await Escusuper.find()
                             .sort({ _id: -1})                             
                             .limit(1)
                             .populate('usuario', '-password')
                             .exec();
    res.json({
     ok: true,
     posts
    });
});
postRoutes.get('/insbarreal', async (req: any, res: Response) => {
   


     const posts = await Insbarreal.find()
                             .sort({ _id: -1})                             
                             .limit(1)
                             .populate('usuario', '-password')
                             .exec();
    res.json({
     ok: true,
     posts
    });
});
postRoutes.get('/inscaes', async (req: any, res: Response) => {
   


     const posts = await Inscaes.find()
                             .sort({ _id: -1})                             
                             .limit(1)
                             .populate('usuario', '-password')
                             .exec();
    res.json({
     ok: true,
     posts
    });
});
postRoutes.get('/diredtos', async (req: any, res: Response) => {
   


     const posts = await Diredtos.find()
                             .sort({ _id: -1})                             
                             .limit(1)
                             .populate('usuario', '-password')
                             .exec();
    res.json({
     ok: true,
     posts
    });
});


postRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {


    const body = req.body;
    body.usuario = req.usuario._id;

    Post.create( body ).then( async postDB => {

        
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
        res.json(err)
    })


});

postRoutes.post('/escugen', [ verificaToken ], (req: any, res: Response) => {


    const body = req.body;
    body.usuario = req.usuario._id;

    Escugen.create( body ).then( async postDB => {

        
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
        res.json(err)
    })


});

postRoutes.post('/escusub', [ verificaToken ], (req: any, res: Response) => {


    const body = req.body;
    body.usuario = req.usuario._id;

    Escusub.create( body ).then( async postDB => {

        
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
        res.json(err)
    })


});

postRoutes.post('/escusuper', [ verificaToken ], (req: any, res: Response) => {


    const body = req.body;
    body.usuario = req.usuario._id;

    Escusuper.create( body ).then( async postDB => {

        
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
        res.json(err)
    })



});
postRoutes.post('/insbarreal', [ verificaToken ], (req: any, res: Response) => {


    const body = req.body;
    body.usuario = req.usuario._id;

    Insbarreal.create( body ).then( async postDB => {

        
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
        res.json(err)
    })


});

postRoutes.post('/inscaes', [ verificaToken ], (req: any, res: Response) => {


    const body = req.body;
    body.usuario = req.usuario._id;

    Inscaes.create( body ).then( async postDB => {

        
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
        res.json(err)
    })


});

postRoutes.post('/diredtos', [ verificaToken ], (req: any, res: Response) => {


    const body = req.body;
    body.usuario = req.usuario._id;

    Diredtos.create( body ).then( async postDB => {

        
        await postDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err => {
        res.json(err)
    })


});


export default postRoutes;