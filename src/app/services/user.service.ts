import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  setUpdatedUser$ = new Subject<any>();

  constructor(
    private db: DatabaseService,
    private cookieSer: CookieService,
  ) {}

  async insertUser(uid: string, objData: any) {
    let isMobileNoReg: boolean;
    const checkMobileNoQuery = `select * from users where mobileNo=${objData.mobileNo}`;
    const queryResult: any = await this.db.sqlQuery(checkMobileNoQuery);
    if (queryResult.rows.length > 0) {
      isMobileNoReg = true;
    } else {
      isMobileNoReg = false;
      const encPassword = window.btoa(objData.password);
      let query: string = ``;
      const table = 'users';
      query += `INSERT INTO ${table} VALUES(`;
      query += `'${uid}','${objData.name}','dealer',${objData.mobileNo},'${encPassword}')`;
      await this.db.sqlQuery(query);
    }
    return isMobileNoReg;
  }

  async getSignin(mobileNo: number, password: string) {
    const encPassword = window.btoa(password);
    const table = 'users';
    const checkDataQuery = `SELECT * FROM ${table} where mobileNo=${mobileNo} and password='${encPassword}'`;
    const queryResult: any = await this.db.sqlQuery(checkDataQuery);
    return new Promise((resolve, reject) => {
      if (queryResult.rows.length > 0) {
        this.cookieSer.set('activeUser', JSON.stringify(queryResult.rows[0]));
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  async getUsers(){
    let query: string = ``;
    query += `SELECT * FROM users WHERE type = 'dealer'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async deleteDealer(uid: string) {
    const query_1: string = `delete from cars where uid = '${uid}'`;
    await this.db.sqlQuery(query_1);
    const query: string = `delete from users where id = '${uid}'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async getTotalDealers(){
    let query: string = `SELECT * FROM users where type = 'dealer'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async updateDealer(objData: any, id: string){
    let query: string = ``;
    query += `update users set name='${objData.name}' where id='${id}'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async updateUser(objData: any, id: string){
    let query: string = `update users set name='${objData.name}' where id='${id}'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

}
