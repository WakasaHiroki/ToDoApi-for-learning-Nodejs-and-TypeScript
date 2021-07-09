import { IDbConnection } from '../../interfaces/gateways/IDbConnection';

export class SqlServerConnection implements IDbConnection {
  query(sql: string, params?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  execute(sql: string, params: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
