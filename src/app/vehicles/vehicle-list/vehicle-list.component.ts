import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/vehicles/models/vehicle.model';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Store } from '@ngrx/store';
import * as vehicleActions from 'src/app/store/actions/vehicle.actions';
import * as vehiclesActions from 'src/app/store/actions/vehicles.actions';
import * as generalActions from 'src/app/shared/general.actions'
import { AppState } from 'src/app/app.reducer';
import { lastValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {

  vehicles$: Vehicle[] = [];
  vehiclesSubscription: Subscription;

  constructor(
        private store: Store<AppState>,
        private vehiculoService: VehiculoService) { }

  async ngOnInit(): Promise<void> {

    this.vehiclesSubscription = this.store.select('vehicles').subscribe(v => {
      this.vehicles$ = v.vehicles;
    })

    this.getVehiculos();
  }
  
  ngOnDestroy(): void {
    this.vehiclesSubscription.unsubscribe();
  }

  getVehiculos(){

    this.vehiculoService.getVehiculos().subscribe((vehiculos) => (
      setTimeout(() => {
        this.store.dispatch(vehiclesActions.getVehicles({ vehicles: vehiculos }))
      }, 3000)
    ));
  }

  deleteVehiculo(vehicle: Vehicle) {
    this.vehiculoService.deleteVehiculo(vehicle).subscribe((res) => (
      this.store.dispatch(vehiclesActions.deleteVehicle({ vehicle: vehicle }))
    ));
  }

  setEditVehicle(vehicle: Vehicle) {
    this.store.dispatch(vehicleActions.setEditVehicle({ vehicle: vehicle }));
  }

}
