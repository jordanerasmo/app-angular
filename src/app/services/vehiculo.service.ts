import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Vehiculo } from '../Interfaces/Vehiculo';

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

  getVehiculos(): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }

  getVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
    const url = `${this.apiUrl}/${vehiculo.id}`;
    return this.http.get<Vehiculo>(url);
  }

  deleteVehiculo(vehiculo: Vehiculo){
    const url = `${this.apiUrl}/${vehiculo.id}`;
    return this.http.delete<Vehiculo>(url).pipe(
      tap(() => {
        this.RefreshData.next();
      })
    );
  }

  addVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.apiUrl, vehiculo).pipe(
      tap(() => {
        this.RefreshData.next();
      })
    );
  }

  updateVehiculo(editId:Number, vehiculo: Vehiculo): Observable<Vehiculo> {
    const url = `${this.apiUrl}/${editId}`;
    return this.http.put<Vehiculo>(url, vehiculo).pipe(
      tap(() => {
        this.RefreshData.next();
      })
    );
  }
}
