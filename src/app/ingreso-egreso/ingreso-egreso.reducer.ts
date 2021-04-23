import { createReducer, on, Action } from '@ngrx/store';
import * as IngresoEgresoAction from './ingreso-egreso.actions';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { state } from '@angular/animations';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgresoModel[];
};

export interface AppStateWithIngreso extends AppState{
  ingresoEgreso: State
}

const initialState: State = {
  items: []
};

const _ingresoEgresoReducer = createReducer(
  initialState,
  on(
    IngresoEgresoAction.setItemsAction,
    (state, { items }) => ({...state, items: [...items]})
  ),
  on(
    IngresoEgresoAction.unSetItemsAction,
    (state) => ({ ...state, items: [] })
  )
);

export function ingresoEgresoReducer(state:any, action:Action){
  return _ingresoEgresoReducer(state, action);
}