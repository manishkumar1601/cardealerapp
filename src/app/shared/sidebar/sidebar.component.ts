import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Input() toggleSidebar: boolean = false;
  data: any;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.data = JSON.parse(this.cookieService.get('activeUser'))
  }
}
