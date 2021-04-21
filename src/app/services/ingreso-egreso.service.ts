import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore:AngularFirestore,
              private authService:AuthService) { }

  createIngresoEgreso(ingresoEgreso:IngresoEgresoModel) {
    const { uid, ..._ingresoEgreso } = ingresoEgreso;
    return this.fireStore.doc(`${this.authService.userAuth.uid}/ingreso-egreso`)
      .collection('items')
      .add({ ..._ingresoEgreso });
  }

  initIngresosEgresosListener( uid:string | undefined ) {
    return this.fireStore.collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( ({ payload }) => ({ uid: payload.doc.id, ...payload.doc.data() as any }) ))
      );
  }

  deleteIngresoEgresoItem( uidItem: string | undefined ){
    return this.fireStore.doc(`${this.authService.userAuth.uid}/ingreso-egreso/items/${uidItem}`).delete();
  }
}
