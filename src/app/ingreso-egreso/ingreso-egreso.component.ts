import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as UI from '../shared/ui.actions';

import Swal from 'sweetalert2';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoEgresoForm:FormGroup;
  type:string = 'ingreso';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService:IngresoEgresoService,
              private store:Store<AppState>) { 
    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.store.select('ui').subscribe( ({ isLoading }) => this.isLoading = isLoading );
  }

  ngOnInit(): void {
  }

  toggleType(){
    return this.type = this.type === 'ingreso' ? 'egreso' : 'ingreso'; 
  }

  save(){
    if(this.ingresoEgresoForm.invalid){ return; }

    const {description, amount} = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgresoModel(description, amount, this.type);

    this.store.dispatch( UI.isLoadingAction() )

    this.ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
    .then( () => {
      Swal.fire('Registro creado', description, 'success')
      this.ingresoEgresoForm.reset();
    })
    .catch( err => Swal.fire('Error!', err.message, 'error') )
    .finally( () => this.store.dispatch( UI.stopLoadingAction() ));
  }

}
