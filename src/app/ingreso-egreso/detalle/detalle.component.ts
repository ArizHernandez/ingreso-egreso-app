import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgresoSub:Subscription = new Subscription;
  ingresoEgreso:IngresoEgresoModel[] = [];

  constructor(private ingresoEgresoService:IngresoEgresoService,
              private store:Store<AppState>) {}

  ngOnInit(): void {
    this.ingresoEgresoSub = this.store.select('ingresoEgreso').subscribe( ({ items }) => this.ingresoEgreso = [...items] );
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSub.unsubscribe();
  }

  deleteItem(uid:string | undefined){
    this.ingresoEgresoService.deleteIngresoEgresoItem(uid)
      .then ( () =>  Swal.fire('Success', 'Item Deleted', 'success') )
      .catch( err => Swal.fire('Upss...', `Error: ${err}`, 'error') );
  }

}
