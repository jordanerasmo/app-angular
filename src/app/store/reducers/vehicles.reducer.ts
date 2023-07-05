import { createReducer, on } from "@ngrx/store";
import { VehiclesPageActions } from "..";
import { Vehicle } from "../../vehicles/models/vehicle.model";

export interface VehiclesState{
    vehicles: Vehicle[],
    loading: boolean,
    error: any
}

const initialState: VehiclesState = {
    vehicles: [],
    loading: true,
    error: null
}

const _vehiclesReducer = createReducer(
    initialState,
    //Getvehicles
    on(VehiclesPageActions.getVehicles, 
        (currentState, action) => ({
            ...currentState,
            loading: false,
            vehicles: [...action.vehicles] //modified with effects
        })
    ),
    //Getvehicle
    on(VehiclesPageActions.getVehicle, 
        (currentState, action) => ({
            ...currentState, //(copia superficial del resto de props) 
            vehicle: currentState.vehicles.find(vehicle => (vehicle.id === action.vehicle.id))
        })
    ),
    //AddVehicle
    on(VehiclesPageActions.addVehicle, 
        (currentState, action) => ({
            ...currentState, //(copia superficial del resto de props) 
            vehicles: [...currentState.vehicles, action.vehicle]
        })

    ),
    //RemoveVehicle
    on(VehiclesPageActions.deleteVehicle,
        (currentState, action) => ({
            ...currentState,
            vehicles: currentState.vehicles.filter((vehicle) => vehicle.id != action.vehicle.id)
        })
    ),
    //UpdateVehicle
    on(VehiclesPageActions.updateVehicle,
        (currentState, action) => ({
            ...currentState,
            vehicles: currentState.vehicles.map((vehicle) => 
            vehicle.id === action.vehicle.id ? action.vehicle : vehicle)
        })
    )
)

export function vehiclesReducer(state: any, action: any){
    return _vehiclesReducer(state, action);
}