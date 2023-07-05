import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VehiclesState } from "./reducers/vehicles.reducer";


const vehiclesState = createFeatureSelector<VehiclesState>('vehiclesState')

//Selector for Vehicles List
export const vehicles = createSelector(
    vehiclesState,
    (vehiclesState) => vehiclesState.vehicles
)