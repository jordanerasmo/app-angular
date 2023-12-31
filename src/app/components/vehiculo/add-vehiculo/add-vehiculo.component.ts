import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-add-vehiculo',
  templateUrl: './add-vehiculo.component.html',
})

export class AddVehiculoComponent implements OnInit {

  vehicleForm! : FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    private vehiculoService: VehiculoService) { }

  marca: string = "";
  modelo: string = "";
  anio: string = "";
  motor: string = "";

  isEdit: boolean = false;
  labelName: string = "Guardar";
  buttonColor: string = "p-button-success";

  editId: number = 0;
  
  ngOnInit() {
      this.generateForm();
      this.generateEditForm();

      this.vehiculoService.RefreshData.subscribe(resp => {
        this.clearAction();
    });
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
    this.vehiculoService.mediador.subscribe(data => {

      this.labelName = "Modificar"
      this.buttonColor = "p-button-warning"

      this.editId = data.data.id;

      this.vehicleForm.setValue({
        marca: data.data.marca,
        modelo: data.data.modelo,
        anio: data.data.anio,
        motor: data.data.motor
      });

      this.isEdit = true;
    })
  }
  
  submitAction(){
    if(this.isEdit){
      this.updateVehiculo();
    }else{
      this.labelName = "Guardar"
      this.addVehiculo();
    }
  }

  clearAction(){
    this.vehicleForm.reset();
    this.isEdit = false;
    this.buttonColor = "p-button-success"
    this.labelName = "Guardar";
  }

  addVehiculo(){
    if(this.vehicleForm.valid){
      this.vehiculoService.addVehiculo(this.vehicleForm.value).subscribe({
        next:(res) => { 
          this.vehicleForm.reset();
        },
        error:() => { 
          alert("error al registrar el vehiculo") 
        }
      })
    }
  }

  updateVehiculo(){
    if(this.vehicleForm.valid){
      this.vehiculoService.updateVehiculo(this.editId, this.vehicleForm.value).subscribe({
        next:(res) => { 
          this.vehicleForm.reset();
        },
        error:() => { 
          alert("error al registrar el vehiculo") 
        }
      })
    }
  }


}