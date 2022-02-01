import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarlistComponent } from './carlist.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageCarComponent } from 'src/app/modals/manage-car/manage-car.component';
import { CarService } from 'src/app/services/car.service';

const routes: Routes = [
  {
    path:'',
    component: CarlistComponent,
  },
];

@NgModule({
  declarations: [ CarlistComponent, ManageCarComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [ CarService ],
})
export class CarlistModule { }
