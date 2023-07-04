import { ActionReducerMap } from "@ngrx/store";
import * as vehicle from "./state";
import * as general from "./shared/general.reducer";

export interface AppState {
    general: general.GeneralState,
    vehicle: vehicle.VehiclesState
}

export const appReducers: ActionReducerMap<AppState> = {
    general: general.generalReducer,
    vehicle: vehicle.vehicleReducer
}