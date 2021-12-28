import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const {uid, ...resto} = ingresoEgreso;
    return this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos`)
        .collection('items')
        .add({...resto});
  }

  initIngresosEgresosListener(uid: string | undefined){
    // console.log(uid);
    return this.firestore.collection(`${ uid }/ingresos-egresos/items`).snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        ))
      )
  }

  borrarIngresoEgreso(uidItem: string | undefined){
    const uid = this.authService.user?.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }

}
