import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DealersComponent } from './dealers.component';
import { ManageDealerComponent } from 'src/app/modals/manage-dealer/manage-dealer.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'',
    component: DealersComponent,
  },
];

@NgModule({
  declarations: [DealersComponent, ManageDealerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class DealersModule { }
