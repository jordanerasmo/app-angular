import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/vehicles/models/vehicle.model';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  vehicles$: Vehicle[] = [];//Observable<Vehicle[]> = this.store.select(VehiclesSelectors.vehicles);
  loading$: boolean = true; //Observable<boolean> = this.store.select(VehiclesSelectors.preload)

  constructor(
        //private store: Store,
        private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.getVehiculos();
  }

  getVehiculos() {

    //this.store.dispatch(VehiclesPageActions.activePreload());

    this.vehiculoService.getVehiculos().subscribe((vehiculos) => (
      setTimeout(() => {
        console.log("Espera de 3 segundos...");
        this.vehicles$ = vehiculos;
        //this.store.dispatch(VehiclesPageActions.getVehicles({ vehicles: vehiculos }))
      }, 3000)
    ));
  }

  deleteVehiculo(vehicle: Vehicle) {
    this.vehiculoService.deleteVehiculo(vehicle).subscribe((res) => (
      console.log(res)
      //this.store.dispatch(VehiclesPageActions.deleteVehicle({ vehicle: vehicle }))
    ));
  }

  getVehiculo(vehicle: Vehicle) {
    this.vehiculoService.getVehiculo(vehicle).subscribe({
      next: (dataResp) => {
        this.sendData(dataResp);
        //this.store.dispatch(VehiclesPageActions.getVehicle({ vehicle: dataResp }));
      },
      error: () => {
        alert("error al realizar la peticion")
      }

    });
  }

  sendData(dataResp: Vehicle) {
    this.vehiculoService.mediador.emit({
      data: dataResp
    })
  }

}
