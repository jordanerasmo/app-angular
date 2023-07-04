import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/vehicles/models/vehicle.model';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Store } from '@ngrx/store';
import * as vehicleActions from 'src/app/vehicles/vehicles.actions';
import * as generalActions from 'src/app/shared/general.actions'
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {

  vehicles$: Vehicle[] = [];
  vehicleSubscription: Subscription;

  constructor(
        private store: Store<AppState>,
        private vehiculoService: VehiculoService) { }

  ngOnInit(): void {

    this.vehicleSubscription = this.store.select('vehicle').subscribe(v => {
      this.vehicles$ = v.vehicles;
    })

    this.store.dispatch(generalActions.startLoading());
    this.getVehiculos();
    this.store.dispatch(generalActions.stopLoading())
  }

  ngOnDestroy(): void {
    this.vehicleSubscription.unsubscribe();
  }

  getVehiculos() {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => (
      setTimeout(() => {
        this.store.dispatch(vehicleActions.getVehicles({ vehicles: vehiculos }))
      }, 3000)
    ));
  }

  deleteVehiculo(vehicle: Vehicle) {
    this.vehiculoService.deleteVehiculo(vehicle).subscribe((res) => (
      this.store.dispatch(vehicleActions.deleteVehicle({ vehicle: vehicle }))
    ));
  }

  setEditVehicle(vehicle: Vehicle) {
    this.store.dispatch(vehicleActions.setEditVehicle({ vehicle: vehicle }));
  }

}
