import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from './../../../interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cars: number;
  data: IUser;
  totalCars: number;
  totalDealers: number;

  constructor(private carService: CarService, private cookieService: CookieService, private userService: UserService) {}

  async ngOnInit() {
    const carList: any = await this.carService.getCarList();
    this.cars = carList.rows.length;
    const totalCars: any = await this.carService.getTotalCars();
    this.totalCars = totalCars.rows.length;
    const totalDealers: any = await this.userService.getTotalDealers();
    this.totalDealers = totalDealers.rows.length;
    this.data = JSON.parse(this.cookieService.get('activeUser'));
  }

}
