import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { AppState } from '../app.reducer';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';
import { AppStateWithIngreso } from '../ingreso-egreso/ingreso-egreso.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userFirebaseSubscription:Subscription = new Subscription;
  private _user:UserModel = { email: '', name: '', uid: '' };

  constructor( private auth:AngularFireAuth,
               private firestore: AngularFirestore,
               private store:Store<AppState>) {}

  initAuthListener(){
    this.auth.authState.subscribe( userAuth => {
      if( userAuth ){
        this.userFirebaseSubscription = this.firestore.doc(`${userAuth.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser:any) => {
            const user = UserModel.newUserModel(firestoreUser);
            this._user = user;
            this.store.dispatch( authActions.setUser({user}) )             
          });
      } else {
        this._user = { email: '', name: '', uid: '' };
        this.userFirebaseSubscription.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( ingresoEgresoActions.unSetItemsAction() );            
      }
    });
  }

  get userAuth(){
    return { ...this._user };
  }

  createUser(name:string, email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password)
            .then( ({ user }) => {
              const newUser = new UserModel(user?.uid, name, user?.email );
              return this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser })
            });
  }
  
  logIn(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( user => user != null )
    );
  }
}
