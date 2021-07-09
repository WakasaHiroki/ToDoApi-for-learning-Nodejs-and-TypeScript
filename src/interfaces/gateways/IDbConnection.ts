export interface IDbConnection {
  query(sql: string, params?: any): Promise<any>;
  execute(sql: string, params: any): Promise<any>;
}
