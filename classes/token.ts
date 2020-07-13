import jwt from 'jsonwebtoken';


export default class Token {

    private static seed: string = 'este-es-el-seed-de-mi-app-secreto';
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
            usuario: payload
        }, this.seed, { expiresIn: this.caducidadTokenRegistro });

    }

    
    static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( userToken, this.seed, ( err, decoded ) => {
    
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

            jwt.verify( userToken, this.seed, ( err, decoded ) => {
    
                if ( err ) {
                    reject();
                } else {
                    resolve( decoded );
                }
    
    
            })

        });


    }


}


