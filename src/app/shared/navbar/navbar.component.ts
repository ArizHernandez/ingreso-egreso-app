import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userName:string | undefined = '';
  userSub:Subscription = new Subscription;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.userSub = this.store.select('user').subscribe( ({ user }) => this.userName = user.name );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
