import { createReducer, on } from "@ngrx/store";
import { VehiclesPageActions } from "../state";
import { Vehicle } from "./models/vehicle.model";

export interface VehiclesState{
    vehicles: Vehicle[],
    preload: boolean,
    vehicleEdit: Vehicle
}

const vehicleEditInit: Vehicle = {
    id: 0,
    marca: "",
    modelo: "",
    motor: "",
    anio: ""
}

const initialState: VehiclesState = {
    vehicles: [],
    preload: false,
    vehicleEdit: vehicleEditInit
}

const _vehicleReducer = createReducer(
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
    //StopPreload
    on(VehiclesPageActions.stopPreload,
        (currentState, action) => {
            return {
                ...currentState,
                preload: false
            }
        }
    ),
    //Getvehicles
    on(VehiclesPageActions.getVehicles, 
        (currentState, action) => ({
            ...currentState,
            vehicles: [...action.vehicles].map(v => {
                return {...v, setEdit: false}
            })
        })
    ),
    //Getvehicle
    on(VehiclesPageActions.getVehicle, 
        (currentState, action) => ({
            ...currentState, //(copia superficial del resto de props) 
            vehicle: currentState.vehicles.find(vehicle => (vehicle.id === action.vehicle.id))
        })
    ),
     //SetEditVehicle
     on(VehiclesPageActions.setEditVehicle, 
        (currentState, action) => ({
            ...currentState, //(copia superficial del resto de props) 
            vehicleEdit: action.vehicle
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

export function vehicleReducer(state: any, action: any){
    return _vehicleReducer(state, action);
}