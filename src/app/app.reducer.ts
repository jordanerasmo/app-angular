import { ActionReducerMap } from "@ngrx/store";
import * as vehicles from "./store";
import * as vehicle from "./store/reducers/vehicle.reducer";
import * as general from "./shared/general.reducer";

export interface AppState {
    general: general.GeneralState,
    vehicles: vehicles.VehiclesState,
    vehicle: vehicle.VehicleState,
}

export const appReducers: ActionReducerMap<AppState> = {
    general: general.generalReducer,
    vehicles: vehicles.vehiclesReducer,
    vehicle: vehicle.vehicleReducer
}