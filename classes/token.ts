import jwt from 'jsonwebtoken';

require('dotenv').config();


export default class Token {

    private static seed: any = process.env.SEED;
    private static caducidad: string = '5d';
    private static caducidadTokenRegistro: string = '45m';

    constructor() { }

    static getJwtToken( payload: any ): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });

    }

    static getJwtTokenRegistro( payload: any ): string {
        return jwt.sign({
            hash: payload
        }, this.seed, { expiresIn: this.caducidadTokenRegistro });

    }

    
    static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( userToken, this.seed, ( err: any, decoded: any ) => {
    
                if ( err ) {
                    reject();
                } else {
                    resolve( decoded );
                }
            })

        });


    }

    static comprobarTokenRegistro( userToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( userToken, this.seed, ( err: any, decoded:any ) => {
    
                if ( err ) {
                    reject();
                } else {
                    resolve( decoded );
                }
    
    
            })

        });


    }


}


