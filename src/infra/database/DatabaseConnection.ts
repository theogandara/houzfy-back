import pgp from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

export default interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<any>;
}

export class PGPromiseAdapter implements DatabaseConnection {
  connection: any;
  cn: any;

  constructor() {
    this.cn = {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: Number(process.env.DB_MAX),
    };

    this.connection = pgp()(this.cn);
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<any> {
    return this.connection.$pool.end();
  }
}
