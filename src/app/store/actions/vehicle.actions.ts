import { createAction, props } from "@ngrx/store"
import { Vehicle } from "../../vehicles/models/vehicle.model"

export const setEditVehicle = createAction('[Vehicles Page] Set Edit Vehicle', 
props<{ vehicle: Vehicle }>())

export const unsetEditVehicle = createAction('[Vehicles Page] Unset Edit Vehicle')