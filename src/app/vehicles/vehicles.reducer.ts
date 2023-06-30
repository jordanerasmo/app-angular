import { createReducer, on } from "@ngrx/store";
import { VehiclesPageActions } from "../state";
import { Vehicle } from "./models/vehicle.model";

export interface VehiclesState{
    vehicles: Vehicle[],
    preload: boolean
}

const initialState: VehiclesState = {
    vehicles: [],
    preload: false
}

export const vehiclesReducer = createReducer(
    //Init preload
    initialState,
    on(VehiclesPageActions.activePreload,
        (currentState, action) => {
            return {
                ...currentState,
                preload: true
            }
        }
    ),
    //Getvehicles
    on(VehiclesPageActions.getVehicles, 
        (currentState, action) => ({
            preload: false,
            vehicles: action.vehicles
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

