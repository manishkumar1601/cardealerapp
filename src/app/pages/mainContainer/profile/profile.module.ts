import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserTypePipe } from 'src/app/pipe/user-type.pipe';

const routes: Routes = [
  {
    path:'',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [ ProfileComponent, UserTypePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
