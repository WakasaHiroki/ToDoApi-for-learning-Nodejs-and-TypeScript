import { ITaskRepository } from '../../../../domain/models/task/ITaskRepository';
import { Task } from '../../../../domain/models/task/Task';
import { IDbConnection } from '../../IDbConnection';

export class TaskRepository implements ITaskRepository {
  private readonly _connection: IDbConnection;

  constructor(connection: IDbConnection) {
    this._connection = connection;
  }

  async findAll(): Promise<Task[]> {
    const records = await this._connection.query(
      MySql.TaskFindAllQuery.QueryText
    );
    return records.map((record) => {
      return Task.of(
        record.id,
        record.title,
        record.description,
        record.operated_at,
        record.is_deleted
      );
    });
  }

  async find(id: string): Promise<Task> {
    const record = await this._connection.query(MySql.TaskFindQuery.QueryText, [
      id
    ]);

    if (record == null) {
      return record;
    }

    return Task.of(
      record.id,
      record.title,
      record.description,
      record.operated_at,
      record.is_deleted
    );
  }

  async store(task: Task): Promise<any> {
    return await this._connection.execute(MySql.TaskMergeCommand.CommandText, [
      task.id,
      task.operatedAt,
      task.title,
      task.description,
      task.isDeleted
    ]);
  }
}
