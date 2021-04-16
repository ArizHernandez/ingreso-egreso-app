import { UserModel } from '../models/user.model';
import { createReducer, on, Action } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';

export interface State{
  user:UserModel;
}

const initialState:State = { 
  user: {name: '', email: '', uid: ''}
};

const _authReducer = createReducer(initialState,
  on( setUser, (state, { user }) => ({...state, user: { ...user } })),
  on( unSetUser, state => ({...state, user: ({ name: '', email: '', uid: '' }) }))
);

export function authReducer(state:any, action:Action){
  return _authReducer( state, action );
}