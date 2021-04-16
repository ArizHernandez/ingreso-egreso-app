import { ActionReducerMap } from '@ngrx/store';
import * as UI from './shared/ui.reducer';
import * as Auth from './auth/auth.reducer';

export interface AppState{
  ui: UI.State,
  user: Auth.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UI.uiReducer,
  user: Auth.authReducer
}