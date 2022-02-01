import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainContainerComponent } from './main-container.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: MainContainerComponent,
    children: [
      {
        path:'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[AuthGuard]
      },
      {
        path:'carlist',
        loadChildren: () => import('./carlist/carlist.module').then(m => m.CarlistModule),
        canActivate:[AuthGuard],
      }
      ,
      {
        path:'dealers',
        loadChildren: () => import('./dealers/dealers.module').then(m => m.DealersModule),
        canActivate:[AuthGuard],
      },
      {
        path:'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate:[AuthGuard],
      }
    ]
  },
];


@NgModule({
  declarations: [
    MainContainerComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MainContainerModule { }
