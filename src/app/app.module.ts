import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { vehiclesReducer } from './state';
import { VehicleModule } from "./vehicles/vehicle.module";

//primeNg
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ButtonModule,
        TableModule,
        ToastModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
            vehiclesState: vehiclesReducer
        }),
        StoreDevtoolsModule.instrument({}),
        VehicleModule
    ]
})
export class AppModule { }
