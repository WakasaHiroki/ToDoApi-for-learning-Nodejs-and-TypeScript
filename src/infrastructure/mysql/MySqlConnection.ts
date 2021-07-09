import { IDbConnection } from '../../interfaces/gateways/IDbConnection';
import * as mysql from 'mysql';
import * as util from 'util';

export class MySqlConnection implements IDbConnection {
  private _pool: any;

  constructor() {
    this._pool = mysql.createPool({
      connectionLimit: 5,
      host: '', // config等から取得。以下同じ。
      user: '',
      password: '',
      database: '',
      timezone: 'utc'
    });

    this._pool.getConnection((error: any, connection: any) => {
      if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
        } else if (error.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.');
        } else if (error.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.');
        }
      }

      if (connection) {
        connection.release();
      }

      return;
    });

    this._pool.query = util.promisify(this._pool.query);

    // pool event
    this._pool.on('connection', (connection: any) => {
      console.log('mysql connection create');
    });

    this._pool.on('release', (connection: any) => {
      console.log('Connection %d released', connection.threadId);
    });
  }
  query(sql: string, params?: any): Promise<any> {
    if (params !== null) {
      return this._pool.query(sql, params);
    }
    return this._pool.query(sql);
  }
  execute(sql: string, params: any): Promise<any> {
    if (params !== null) {
      return this._pool.execute(sql, params);
    }
    return this._pool.execute(sql);
  }
}
