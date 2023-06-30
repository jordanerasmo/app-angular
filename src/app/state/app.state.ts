import { ActionReducerMap } from "@ngrx/store";
import { VehiclesState } from "../vehicles/vehicles.reducer";
import { vehiclesReducer } from "../vehicles/vehicles.reducer";

export interface AppState {
    vehiclesList: VehiclesState
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    vehiclesList: vehiclesReducer
}