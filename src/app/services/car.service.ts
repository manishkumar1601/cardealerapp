import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private db: DatabaseService, private authService: AuthService) {}

  async addCar(objData: any) {
    const uid = await this.authService.getLoginData();
    let query: string = ``;
    query += `INSERT INTO cars VALUES(`;
    query += `'${objData.cid}','${uid.id}', '${objData.name}', '${objData.model}', ${objData.year}, '${objData.image}')`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async getCarList() {
    const loginData = await this.authService.getLoginData();
    let query: string = ``;
    query += `SELECT * FROM cars WHERE uid = '${loginData.id}'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async getCarDealerList(id: string) {
    let query: string = ``;
    query += `SELECT * FROM cars WHERE uid = '${id}'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async deleteCar(cid: string) {
    const query: string = `delete from cars where cid = '${cid}'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async getDeleteCar(cid: string) {
    const query: string = `select * from cars where cid = '${cid}'`;
    const queryResult: any = await this.db.sqlQuery(query);
    return queryResult.rows[0];
  }

  async updateCarData(data: any, cid: string) {
    let query: string = ``;
    query += `update cars set name='${data.name}', model='${data.model}', year=${data.year},`;
    query += ` image='${data.image}' where cid='${cid}'`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async getTotalCars(){
    let query: string = `SELECT * FROM cars`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

  async getTotalCarsData(){
    let query: string = `SELECT users.name as username,cars.* FROM users INNER JOIN cars ON users.id = cars.uid`;
    const queryResult = await this.db.sqlQuery(query);
    return queryResult;
  }

}
