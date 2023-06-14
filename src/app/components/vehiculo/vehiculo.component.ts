import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../Interfaces/Vehiculo';


@Component({
    selector: 'app-vehiculo',
    templateUrl: 'vehiculo.component.html'
})

export class VehiculoComponent implements OnInit {
    vehiculos: Vehiculo[] = [];
    vehiculo?: Vehiculo;

    constructor(private vehiculoService: VehiculoService) { }

    ngOnInit() {
        this.getVehiculos();
        this.vehiculoService.RefreshData.subscribe(resp => {
            this.getVehiculos();
        });
    }

    getVehiculos(){
        this.vehiculoService.getVehiculos().subscribe((vehiculos) => (this.vehiculos = vehiculos));
    }

    deleteVehiculo(vehiculo: Vehiculo){
        this.vehiculoService.deleteVehiculo(vehiculo).subscribe(() => (this.vehiculos = this.vehiculos.filter(v => v.id != vehiculo.id)));
    }

    getVehiculo(vehiculo: Vehiculo){
        this.vehiculoService.getVehiculo(vehiculo).subscribe({
            next:(dataResp) => { 
              this.sendData(dataResp);
            },
            error:() => { 
              alert("error al realizar la peticion") 
            }
          });
    }

    sendData(dataResp: Vehiculo){
        this.vehiculoService.mediador.emit({
            data: dataResp
        })
    }
}