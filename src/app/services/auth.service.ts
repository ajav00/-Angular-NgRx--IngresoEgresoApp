import { Injectable } from '@angular/core';
// RxJs
import { map } from 'rxjs/operators'
// Models
import { Usuario } from '../models/usuario.model';
// Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser =>{
      console.log(fuser);
    })
  }

  crearUsuario(nombre: string, correo: string, password: string){
    return this.auth.createUserWithEmailAndPassword(correo, password)
              .then( ({ user }) => {
                const newUser = new Usuario(user?.uid, nombre, user?.email || '');

                this.firestore.doc(`${user?.uid}/usuario`).set({...newUser})
              })
  }

  loginUsuario(correo: string, password: string){
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }
}
