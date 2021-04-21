import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

export const unSetItemsAction = createAction('[IngresoEgreso] Unset Items');

export const setItemsAction = createAction(
  '[IngresoEgreso] Set Items',
  props<{ items:IngresoEgresoModel[] }>()  
);