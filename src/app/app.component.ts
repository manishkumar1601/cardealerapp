import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'carDealerApp';
  userData: any;

  constructor(private dbService:DatabaseService, private authService:AuthService){
    this.dbService.createDatabase();
  }

  async ngOnInit(){
    this.userData = await this.authService.getLoginData();
  }

}
