import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  public userName: string | undefined = '';
  userSub:Subscription = new Subscription;

  constructor(private authService:AuthService,
              private router:Router,
              private store:Store<AppState>){}

  ngOnInit(): void {
    this.userSub = this.store.select('user').subscribe( ({ user }) => this.userName = user.name );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logOut(){
    this.authService.logOut()
      .then( () => this.router.navigateByUrl('/login') )
      .catch( err => console.error(err));
  }

}
