import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { IUserReg } from 'src/app/interfaces/signup';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from '../../validator/confirmPassword.validator';

@Component({
  selector: 'app-manage-dealer',
  templateUrl: './manage-dealer.component.html',
  styleUrls: ['./manage-dealer.component.scss']
})
export class ManageDealerComponent implements OnInit {

  dealerForm: FormGroup;
  activeUser: any;

  @Input() dealerEditData: any;
  @Input() isEdit: boolean;

  constructor(
    private userService: UserService,
    public activeModel: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private cookieService: CookieService
  ) { }

  ngOnInit(){
    this.activeUser = JSON.parse(this.cookieService.get('activeUser'));
    this.dealerForm = this.formBuilder.group(
      {
        name: [
          this.isEdit ? this.dealerEditData.name : null,
          [Validators.required, Validators.pattern('^[a-zA-Z]{4}.*')],
        ],
        mobileNo: [
          this.isEdit ? {value:this.dealerEditData.mobileNo, disabled:true} : null,
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        password: [
          this.isEdit ? {value:null, disabled:true} : null,
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
            ),
          ],
        ],
        confirmPassword: [this.isEdit ? {value:null, disabled:true} : null, [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  generateUid() {
    return Math.random().toString(36).substr(2, 9);
  }

  async addDealer() {
    if (!this.isEdit) {
      let objData = this.dealerForm.value;
      const uid = this.generateUid();
      delete objData.confirmPassword;
      const res: any = await this.userService.insertUser(
        uid,
        objData
      );
      if (res) {
        this.toasterService.error('Mobile Number Already Exist');
      } else {
        this.toasterService.success('Dealer Added');
      }
    } else{
      const result: any = await this.userService.updateDealer(
        this.dealerForm.value,
        this.dealerEditData.id
      );
      if (result.rowsAffected === 1) {
        this.toasterService.success('Dealer Updated');
      }
    }
    this.dealerForm.reset();
    this.activeModel.close();
  }


}
