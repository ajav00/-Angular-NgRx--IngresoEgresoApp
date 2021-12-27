export class Usuario {
    constructor(
        public uid?: string,
        public nombre?: string,
        public correo?: string,
    ){}

    static fromFirebase( {correo , uid, nombre}: any){
        return new Usuario(uid, nombre, correo)
    }
}