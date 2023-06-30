import { createAction, props } from "@ngrx/store"
import { Vehicle } from "../vehicles/models/vehicle.model"

export const activePreload = createAction('[Vehicles Page] Preload Vehicles List')

export const getVehicles = createAction('[Vehicles Page] Get Vehicles List', 
props<{ vehicles: Vehicle[]}>())

export const getVehicle = createAction('[Vehicles Page] Get Vehicle', 
props<{ vehicle: Vehicle}>())

export const addVehicle = createAction('[Vehicles Page] Add Vehicle', 
props<{ vehicle: Vehicle}>())

export const updateVehicle = createAction('[Vehicles Page] Update Vehicle', 
props<{ vehicle: Vehicle}>())

export const deleteVehicle = createAction('[Vehicles Page] Delete Vehicle', 
props<{ vehicle: Vehicle}>())
