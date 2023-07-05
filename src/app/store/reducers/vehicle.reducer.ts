import { createReducer, on } from "@ngrx/store";
import * as vehiclePageActions from "../actions/vehicle.actions";
import { Vehicle } from "../../vehicles/models/vehicle.model";

export interface VehicleState{
    vehicleEdit: Vehicle,
    error: any
}

const vehicleEditInit: Vehicle = {
    id: 0,
    marca: "",
    modelo: "",
    motor: "",
    anio: ""
}

const initialState: VehicleState = {
    vehicleEdit: vehicleEditInit,
    error: null
}

const _vehicleReducer = createReducer(
    initialState,
     //SetEditVehicle
     on(vehiclePageActions.setEditVehicle, 
        (currentState, action) => ({
            ...currentState,
            vehicleEdit: {...action.vehicle}
        })
    ),
    //UnsetEditVehicle
    on(vehiclePageActions.unsetEditVehicle, 
        (currentState, action) => ({
            ...currentState,
            vehicleEdit: {...vehicleEditInit}
        })
    ),
)

export function vehicleReducer(state: any, action: any){
    return _vehicleReducer(state, action);
}