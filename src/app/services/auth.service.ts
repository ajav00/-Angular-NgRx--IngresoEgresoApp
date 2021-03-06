import { Injectable } from '@angular/core';
// RxJs
import { map } from 'rxjs/operators'
// Models
import { Usuario } from '../models/usuario.model';
// Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as itemsActions from '../ingreso-egreso/ingreso-egreso.actions';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription();
  private _user: Usuario | null = null;

  get user() {
    return this._user;
  }

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, 
              private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser =>{
      console.log(fuser);
      if(fuser){
        //existe
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((fireUser: any) => {
          // console.log(fireUser);
          const user = Usuario.fromFirebase( fireUser );
          this._user = user;
          console.log(user);
          this.store.dispatch( authActions.setUser({user}) );
        });
      }else{
        // No existe
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unsetUser() );
        this.store.dispatch( itemsActions.unsetItems() );
      }
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
