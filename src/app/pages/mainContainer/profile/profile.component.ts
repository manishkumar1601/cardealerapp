import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { IUser } from 'src/app/interfaces/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  data: IUser;
  isEdit: boolean = false;

  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toasterService:ToasterService,
  ) {}

  ngOnInit() {
    this.data = JSON.parse(this.cookieService.get('activeUser'));
    this.profileForm = this.formBuilder.group({
      name: [
        this.data.name,
        [Validators.required, Validators.pattern('^[a-zA-Z]{4}.*')]
      ],
      mobileNo: [
        this.data.mobileNo,
        [Validators.required, Validators.pattern('^[0-9]{10}$')]
      ],
    });
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['mobileNo'].disable();
  }

  editProfile(isEdit: boolean) {
    this.isEdit = isEdit;
    this.profileForm.controls['name'].enable();
  }

  async updateUser(){
    const res: any = await this.userService.updateUser(this.profileForm.value, this.data.id);
    if (res.rowsAffected === 1) {
      this.data.name = this.profileForm.value.name;
      this.cookieService.set('activeUser', JSON.stringify(this.data));
      this.userService.setUpdatedUser$.next(this.data);
      this.toasterService.success('Data update successfully');
      this.isEdit = false;
      this.profileForm.controls['name'].disable();
      this.profileForm.controls['mobileNo'].disable();
    } else {
      this.toasterService.error('Data cannot update');
    }
  }

  reset(){
    this.profileForm.controls['name'].setValue(this.data.name);
    this.isEdit = false;
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['mobileNo'].disable();
  }

}
