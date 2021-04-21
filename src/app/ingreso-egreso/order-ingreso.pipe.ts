import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'orderIngreso'
})
export class OrderIngresoPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[]): IngresoEgresoModel[] {
    return items.sort( (a, b) => {
      return a.type == 'ingreso' ? -1 : 1;
    } );
  }

}
