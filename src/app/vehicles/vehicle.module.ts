import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';
import { VehiclePageComponent } from './vehicle-page/vehicle-page.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//ngrx
import { StoreModule } from "@ngrx/store";
import { vehiclesReducer } from '../store/reducers/vehicles.reducer';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    VehicleAddComponent,
    VehicleListComponent,
    VehicleItemComponent,
    VehiclePageComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    SkeletonModule,
    StoreModule.forRoot(vehiclesReducer),
    StoreDevtoolsModule.instrument({}),
  ],
  exports: [
    VehiclePageComponent
  ]
})
export class VehicleModule { }
