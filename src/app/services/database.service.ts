import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  db: any;

  constructor() {}

  createDatabase() {
    const db_name = 'dealers';
    const db_version = '1.0';
    const db_describe = 'dealers Database';
    const db_size = 100 * 1024 * 1024;
    this.db = (<any>window).openDatabase(
      db_name,
      db_version,
      db_describe,
      db_size
    );
    this.createUserTable();
    this.createCarTable();
  }

  checkTransaction() {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx: any) => {
          resolve(tx);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  async createUserTable() {
    const tx: any = await this.checkTransaction();
    let SQL_QUERY = ``;
    SQL_QUERY += `CREATE TABLE IF NOT EXISTS users (`;
    SQL_QUERY += `id VARCHAR NOT NULL PRIMARY KEY,`;
    SQL_QUERY += `name VARCHAR NOT NULL,`;
    SQL_QUERY += `type VARCHAR NOT NULL,`;
    SQL_QUERY += `mobileNo INT(10) NOT NULL,`;
    SQL_QUERY += `password VARCHAR NOT NULL)`;
    tx.executeSql(SQL_QUERY);
  }

  async createCarTable(){
    const tx: any = await this.checkTransaction();
    let SQL_QUERY = ``;
    SQL_QUERY += `CREATE TABLE IF NOT EXISTS cars (`;
    SQL_QUERY += `cid VARCHAR NOT NULL PRIMARY KEY,`;
    SQL_QUERY += `uid VARCHAR NOT NULL,`;
    SQL_QUERY += `name VARCHAR NOT NULL,`;
    SQL_QUERY += `model VARCHAR NOT NULL,`;
    SQL_QUERY += `year INT NOT NULL,`;
    SQL_QUERY += `image TEXT NOT NULL,`;
    SQL_QUERY += `FOREIGN KEY (uid) REFERENCES users (id))`;
    tx.executeSql(SQL_QUERY);
  }

  async sqlQuery(query: string) {
    const tx: any = await this.checkTransaction();
    return new Promise((resolve, reject) => {
      tx.executeSql(
        query,
        [],
        (sqlTransaction: any, sqlResultSet: any) => {
          resolve(sqlResultSet);
        },
        (sqlTransaction: any, sqlError: any) => {
          reject("could not execute statement (0 not an error)");
        }
      );
    });
  }
}
