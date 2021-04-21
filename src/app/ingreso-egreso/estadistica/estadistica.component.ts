import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as UIActions from '../../shared/ui.actions';

import { IngresoEgresoModel } from '../../models/ingreso-egreso.model';

import { ChartType, ChartOptions } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos :number = 0;
  egresos  :number = 0;

  totalEgresos  :number = 0;
  totalIngresos :number = 0;

  public doughnutChartLabels: Label[] = ['Ingreso', 'Egreso'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [{ backgroundColor: ['#01c22e8c', '#e0162a8c'] }];

  constructor(private store:Store<AppState>) { 
  }
  
  ngOnInit(): void {
    this.store.select('ingresoEgreso')
    .subscribe( ({ items }) => {
      this.generarEstadistica(items)
    });
  }

  generarEstadistica( items:IngresoEgresoModel[] ) {
    this.resetValues();

    for(let item of items){
      if(item.type === 'ingreso'){
        this.totalIngresos += item.amount;
        this.ingresos ++; 
      } else {
        this.totalEgresos += item.amount;
        this.egresos ++; 
      }
    }

    this.doughnutChartData = [[ this.totalIngresos, this.totalEgresos ]];
  }

  resetValues() {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
  }
}
