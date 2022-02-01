import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
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
    });
  }

  getCookieValue = (name: string) =>
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

  async signin() {
    if (this.loginForm.valid) {
      const objData = this.loginForm.value;
      const mobileNo = objData.mobileNo;
      const password = objData.password;
      const res = await this.userService.getSignin(mobileNo, password);
      if (res) {
        this.router.navigate(['/dashboard']);
        this.toasterService.success('Sign In Successfully');
      } else {
        this.toasterService.error(
          'Mobile Number and Password is incorrect'
        );
      }
    }
  }
}
