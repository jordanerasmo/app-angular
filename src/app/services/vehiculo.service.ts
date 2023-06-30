import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Vehicle as Vehicle } from '../vehicles/models/vehicle.model';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/vehiculos'
  private _refreshdata = new Subject<void>();
  
  get RefreshData(){
    return this._refreshdata;
  }
  
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
    return this.http.delete<Vehicle>(url).pipe(
      tap(() => {
        this.RefreshData.next();
      })
    );
  }

  addVehiculo(vehiculo: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehiculo).pipe(
      tap(() => {
        this.RefreshData.next();
      })
    );
  }

  updateVehiculo(editId:Number, vehiculo: Vehicle): Observable<Vehicle> {
    const url = `${this.apiUrl}/${editId}`;
    return this.http.put<Vehicle>(url, vehiculo).pipe(
      tap(() => {
        this.RefreshData.next();
      })
    );
  }
}
