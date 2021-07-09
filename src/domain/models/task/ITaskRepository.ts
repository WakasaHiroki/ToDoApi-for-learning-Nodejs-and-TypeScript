import { Task } from './Task';

export interface ITaskRepository {
  findAll(): Promise<Array<Task>>;
  find(id: string): Promise<Task>;
  store(task: Task): Promise<any>;
}
