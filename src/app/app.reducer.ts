import { ActionReducerMap } from "@ngrx/store";
import * as vehicle from "./state";

export interface AppState {
    vehicle: vehicle.VehiclesState
}

export const appReducers: ActionReducerMap<AppState> = {
    vehicle: vehicle.vehicleReducer
}