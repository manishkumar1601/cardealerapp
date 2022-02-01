import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private db: DatabaseService
  ) {}

  async getLoginData() {
    let queryResult: any;
    if (this.cookieService.get('activeUser')) {
      const cookieValue = JSON.parse(this.cookieService.get('activeUser'));
      let query = `select * from users where id='${cookieValue.id}'`;
      queryResult = await this.db.sqlQuery(query).then((result: any) => {
        return result.rows[0];
      });
    }
    return queryResult;
  }





}
