import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSub:Subscription = new Subscription();
  ingresosEgresosSub:Subscription = new Subscription();

  constructor(private store:Store<AppState>,
              private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSub = this.store.select('user')
    .pipe( 
      filter( auth => auth.user.uid !== '' ) 
    )
    .subscribe( ({ user }) => {
      this.ingresosEgresosSub = this.ingresoEgresoService.initIngresosEgresosListener( user.uid )
        .subscribe( ingresosEgresosFB => this.store.dispatch( ingresoEgresoActions.setItemsAction({ items: ingresosEgresosFB }) ) )
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.ingresosEgresosSub.unsubscribe();
  }  

}
