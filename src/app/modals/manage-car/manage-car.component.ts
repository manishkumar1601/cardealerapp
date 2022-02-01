import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from '../../services/toaster.service';
import { CarService } from 'src/app/services/car.service';
import { ICar } from '../../interfaces/car';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.scss'],
})
export class ManageCarComponent implements OnInit {
  carForm: FormGroup;
  years: number[] = [];
  selectedFile: any;
  // activeUser: any;

  @Input() carEditData: ICar;
  @Input() isEdit: boolean;

  constructor(
    public activeModel: NgbActiveModal,
    private fb: FormBuilder,
    private carService: CarService,
    private toasterService: ToasterService,
    private cookieService: CookieService,
  ) {
    const max = new Date().getFullYear();
    const min = max - 14;
    for (let i = max; i >= min; i--) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    JSON.parse(this.cookieService.get('activeUser'));
    this.carForm = this.fb.group({
      name: [this.isEdit ? this.carEditData.name : null, [Validators.required]],
      model: [
        this.isEdit ? this.carEditData.model : null,
        [Validators.required],
      ],
      year: [this.isEdit ? this.carEditData.year : null, [Validators.required]],
      image: [
        this.isEdit ? this.carEditData.image : null,
        [Validators.required],
      ],
    });
    if (this.isEdit) {
      this.selectedFile = this.carEditData.image;
    }
  }


  async addCar() {
    if (this.isEdit) {
      this.carForm.value['image'] = this.selectedFile;
      const result: any = await this.carService.updateCarData(
        this.carForm.value,
        this.carEditData.cid
      );
      if (result.rowsAffected === 1) {
        this.toasterService.success('Car Updated');
      }
    } else {
      let objData = this.carForm.value;
      objData.cid = this.generateUid();
      const res: any = await this.carService.addCar(objData);
      if (res.rowsAffected === 1) {
        this.toasterService.success('Car Added');
      }
    }
    this.carForm.reset();
    this.selectedFile = null;
    this.activeModel.close();
  }

  generateUid() {
    return Math.random().toString(36).substr(2, 9);
  }

  async convertImageToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.selectedFile = e.target.result;
        resolve(reader.result);
      };
      reader.onerror = (e: any) => {
        reject(e);
      };
    });
  }

  async onFileSelected(event: any) {
    if (event.target.files.length) {
      const image = await this.convertImageToBase64(event.target.files[0]);
      this.carForm.patchValue({
        image,
      });
    }
  }


}
