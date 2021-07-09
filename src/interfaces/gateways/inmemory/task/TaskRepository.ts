import { ITaskRepository } from '../../../../domain/models/task/ITaskRepository';
import { Task } from '../../../../domain/models/task/Task';
import { IDbConnection } from '../../IDbConnection';

export class TaskRepository implements ITaskRepository {
  private _store: Task[];

  constructor(connection: IDbConnection) {
    // connectionは使わない
    this._store = [];
  }

  async findAll(): Promise<Task[]> {
    return this._store;
  }

  async find(id: string): Promise<Task> {
    let filtered = this._store.filter((task): boolean => task.id === id);

    if (filtered.length === 0) {
      return null;
    }

    return filtered[0];
  }

  async store(task: Task): Promise<any> {
    let filtered = this._store.filter((_task): boolean => _task.id === task.id);

    if (filtered.length === 0) {
      filtered.push(task);
    }

    filtered[0] = task;
  }
}
