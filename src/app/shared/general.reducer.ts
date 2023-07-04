import { createReducer, on, State} from '@ngrx/store'
import * as general from "./general.actions";

export interface GeneralState{
    isLoading: boolean;
}

export const initialState: GeneralState = {
    isLoading: false
}

const _generalReducer = createReducer(initialState, 
    on( general.startLoading, state => ({ ...state, isLoading: true})),
    on( general.stopLoading, state => ({ ...state, isLoading: false}))
);

export function generalReducer(state: any, action: any){
    return _generalReducer(state, action)
}