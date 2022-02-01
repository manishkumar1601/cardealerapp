import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';
import { ManageCarComponent } from '../../../modals/manage-car/manage-car.component';
import Swal from 'sweetalert2';
import { ICar } from '../../../interfaces/car';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss'],
})
export class CarlistComponent implements OnInit {
  selectedFile: any;
  carForm: FormGroup;
  cars: ICar[];
  isEdit: boolean = false;
  carEditData: ICar;
  carErrorMessage: boolean;
  data: IUser;

  constructor(private modalService: NgbModal, private carService: CarService, private cookieService: CookieService) {}

  ngOnInit() {
    this.data = JSON.parse(this.cookieService.get('activeUser'));
    if(this.data.type === 'dealer'){
      this.getCarList();
    }
    this.getTotalCarsData();
  }

  generateUid() {
    return Math.random().toString(36).substr(2, 9);
  }

  open(isEdit: boolean, data?: ICar) {
    this.isEdit = isEdit;
    const modalRefer = this.modalService.open(ManageCarComponent, {
      size: 'md',
    });
    modalRefer.componentInstance.carEditData = data;
    modalRefer.componentInstance.isEdit = isEdit;
    modalRefer.result.then(
      () => {
        if(this.data.type === 'admin'){
          this.getTotalCarsData();
        } else {
          this.getCarList();
        }
      },
      () => {}
    );
  }

  async getCarList() {
    const carList: any = await this.carService.getCarList();
    if (carList?.rows.length > 0) {
      this.cars = carList?.rows;
      this.carErrorMessage = false;
    } else {
      this.carErrorMessage = true;
    }
  }

  async deleteCar(data: ICar) {
    Swal.fire({
      title: `Are you sure to delete ${data.model} Car?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.carService.deleteCar(data.cid);
        if(this.data.type === 'admin'){
          this.getTotalCarsData();
        } else {
          this.getCarList();
        }
        Swal.fire('Deleted!', 'Your car has been deleted.', 'success');
      }
    });
  }

  async getTotalCarsData(){
    const cars: any = await this.carService.getTotalCarsData();
    if (cars?.rows.length > 0) {
      this.cars = cars?.rows;
      this.carErrorMessage = false;
    } else {
      this.carErrorMessage = true;
    }
  }


}
