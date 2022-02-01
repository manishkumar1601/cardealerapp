import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data: any;

  @Input() toggleSidebar: boolean = false;
  @Output() toggleSidebarChange: any = new EventEmitter();

  constructor(
    private router: Router,
    private cookieSer: CookieService,
    private toaster: ToasterService,
    private userService: UserService
  ) {
    this.userService.setUpdatedUser$.subscribe((user: any) => {
      this.data = user;
    })
  }

  async ngOnInit() {
    this.data = JSON.parse(this.cookieSer.get('activeUser'));
  }

  logoutUser() {
    this.cookieSer.delete('activeUser');
    this.router.navigate(['/signin']);
    this.toaster.success('Sign Out Successfully');
  }

  menuToggle() {
    if (!this.toggleSidebar) {
      this.toggleSidebar = true;
    } else {
      this.toggleSidebar = false;
    }
    this.toggleSidebarChange.emit(this.toggleSidebar);
  }
}
