import { ActionReducerMap } from "@ngrx/store";
import { vehiclesState } from "../Interfaces/vehicle.state";
import { vehiclesReducer } from "./reducers/vehicles.items.reducers";

export interface AppState {
    vehiclesList: vehiclesState
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    vehiclesList: vehiclesReducer
}