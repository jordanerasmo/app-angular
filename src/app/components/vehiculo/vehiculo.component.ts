import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehicle } from '../../Interfaces/Vehicle';
import { VehiclesPageActions, VehiclesSelectors } from 'src/app/state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-vehiculo',
    templateUrl: 'vehiculo.component.html'
})

export class VehiculoComponent implements OnInit {

    loading$: Observable<boolean> = this.store.select(VehiclesSelectors.preload)
    vehicles$?: Observable<Vehicle[]> = this.store.select(VehiclesSelectors.vehicles);

    constructor(
        private store: Store,
        private vehiculoService: VehiculoService) { }

    ngOnInit() {
        this.getVehiculos();
    }
    
    getVehiculos(){

        this.store.dispatch(VehiclesPageActions.activePreload());

        this.vehiculoService.getVehiculos().subscribe((vehiculos) => (
            setTimeout(() => {
                console.log("Espera de 3 segundos...");
                this.store.dispatch(VehiclesPageActions.getVehicles({vehicles: vehiculos}))
            }, 3000)
        ));
    }

    deleteVehiculo(vehicle: Vehicle){
        this.vehiculoService.deleteVehiculo(vehicle).subscribe(() => (
           this.store.dispatch(VehiclesPageActions.deleteVehicle({ vehicle: vehicle}))
        ));
    }

    getVehiculo(vehicle: Vehicle){
        this.vehiculoService.getVehiculo(vehicle).subscribe({
            next:(dataResp) => { 
              this.sendData(dataResp);
              this.store.dispatch(VehiclesPageActions.getVehicle({ vehicle: dataResp}));
            },
            error:() => { 
              alert("error al realizar la peticion") 
            }
            
          });
    }

    sendData(dataResp: Vehicle){
        this.vehiculoService.mediador.emit({
            data: dataResp
        })
    }
}