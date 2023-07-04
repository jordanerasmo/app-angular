import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import * as vehicleActions from 'src/app/vehicles/vehicles.actions';
import { Vehicle } from '../models/vehicle.model';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss'],
  providers: [MessageService]
})
export class VehicleAddComponent implements OnInit, OnDestroy{

  vehicleForm! : FormGroup;
  vehicleSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private formBuilder : FormBuilder,
    private vehiculoService: VehiculoService,
    private messageService: MessageService) { }

  marca: string = "";
  modelo: string = "";
  anio: string = "";
  motor: string = "";

  isEdit: boolean = false;
  vehicleEdit: Vehicle;

  labelName: string = "Guardar";
  buttonColor: string = "p-button-success";

  editId: number = 0;

  ngOnInit(): void {

    this.vehicleSubscription = this.store.select('vehicle').subscribe(v => {
      this.vehicleEdit = v.vehicleEdit;
      if(this.vehicleEdit.id != 0){
        this.generateEditForm();
      }
    })

    this.generateForm();
  }

  ngOnDestroy(): void{
    this.vehicleSubscription.unsubscribe();
  }

  generateForm(){
    this.vehicleForm = this.formBuilder.group({
      marca: ["", Validators.required],
      modelo: ["", Validators.required],
      anio: ["", Validators.required],
      motor: ["", Validators.required]
    })
  }

  generateEditForm(){
    this.labelName = "Modificar"
    this.buttonColor = "p-button-warning"
    this.isEdit = true;

    this.editId = this.vehicleEdit.id

    this.vehicleForm.setValue({
      marca: this.vehicleEdit.marca,
      modelo: this.vehicleEdit.modelo,
      anio: this.vehicleEdit.anio,
      motor: this.vehicleEdit.motor
    })

  }
  
  submitAction(){

    if(this.vehicleForm.valid)
    {
      return this.isEdit ? this.updateVehiculo() : this.addVehiculo()
    }
    else
    {
      this.showMessage("Info", "Debe completar todos los campos")
    }
  }

  clearAction(){
    this.vehicleForm.reset();
    this.isEdit = false;
    this.buttonColor = "p-button-success"
    this.labelName = "Guardar";
  }

  addVehiculo(){
    this.vehiculoService.addVehiculo(this.vehicleForm.value).subscribe({
      next:(res) => { 
        this.store.dispatch(vehicleActions.addVehicle({ vehicle: res}));
        this.clearAction();
      },
      error:() => { 
        alert("error al registrar el vehiculo") 
      }
    })
  }

  updateVehiculo(){
    this.vehiculoService.updateVehiculo(this.editId, this.vehicleForm.value).subscribe({
      next:(res) => { 
        this.store.dispatch(vehicleActions.updateVehicle({ vehicle: res}));
        this.clearAction();
      },
      error:() => { 
        this.showError();
      }
    })
  }

  showCorrectSave() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Exito', detail: 'Vehiculo registrado correctamente' });
  }

  showError() {
    this.messageService.add({ key: 'tc', severity: 'Error', summary: 'Error', detail: 'Ocurrio un error al realizar la peticion' });
  }

  showMessage(message: string, title: string) {
    this.messageService.add({ key: 'tc', severity: 'info', summary: message, detail: title });
  }

}
