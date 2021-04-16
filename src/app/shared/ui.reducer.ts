import { createReducer, Action ,on } from "@ngrx/store";
import { isLoadingAction, stopLoadingAction } from './ui.actions';

export interface State{
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

const _uiReducer = createReducer( initialState,
  on(isLoadingAction, state => ({ ...state, isLoading: true })),
  on(stopLoadingAction, state => ({ ...state, isLoading: false })),
);

export function uiReducer(state:any, action:Action){
  return _uiReducer(state, action);
}