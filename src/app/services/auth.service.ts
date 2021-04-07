import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth:AngularFireAuth,
               private firestore: AngularFirestore) {}

  initAuthListener(){
    this.auth.authState
      .subscribe( user => {
        console.log(user)
      })
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
