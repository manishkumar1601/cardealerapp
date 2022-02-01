import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../../validator/confirmPassword.validator';
import { IUserReg } from '../../interfaces/signup';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  dealers: IUserReg[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        name: [
          null,
          [Validators.required, Validators.pattern('^[a-zA-Z]{4}.*')],
        ],
        mobileNo: [
          null,
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
            ),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  generateUid() {
    return Math.random().toString(36).substr(2, 9);
  }

  async signup() {
    if (this.signupForm.valid) {
      let objData = this.signupForm.value;
      const uid = this.generateUid();
      delete objData.confirmPassword;
      const res = await this.userService.insertUser(
        uid,
        objData
      );
      if (res) {
        this.toasterService.error('Mobile Number Already Exist');
      } else {
        this.router.navigate(['/signin']);
        this.toasterService.success('Account created successfully');
      }
    }
  }

}
