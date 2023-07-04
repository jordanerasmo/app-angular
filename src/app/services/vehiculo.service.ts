import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Vehicle as Vehicle } from '../vehicles/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/vehiculos'
  
  @Output() mediador: EventEmitter<any> = new EventEmitter();

  getVehiculos(): Observable<Vehicle[]>{ 
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehiculo(vehiculo: Vehicle): Observable<Vehicle>{
    const url = `${this.apiUrl}/${vehiculo.id}`;
    return this.http.get<Vehicle>(url);
  }

  deleteVehiculo(vehiculo: Vehicle){
    const url = `${this.apiUrl}/${vehiculo.id}`;
    return this.http.delete<Vehicle>(url)
  }

  addVehiculo(vehiculo: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehiculo)
  }

  updateVehiculo(editId:Number, vehiculo: Vehicle): Observable<Vehicle> {
    const url = `${this.apiUrl}/${editId}`;
    return this.http.put<Vehicle>(url, vehiculo)
  }
}
