import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-vehicle-page',
  templateUrl: './vehicle-page.component.html',
  styleUrls: ['./vehicle-page.component.scss']
})
export class VehiclePageComponent implements OnInit, OnDestroy {

  vehicleSubscription: Subscription;
  loading: boolean = false;

  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.vehicleSubscription = this.store.select('general').subscribe(v => {      
      this.loading = v.isLoading;
    })
  }

  ngOnDestroy(): void {
    this.vehicleSubscription.unsubscribe();
  }

}