import { ITaskRepository } from '../../../domain/models/task/ITaskRepository';
import { Task } from '../../../domain/models/task/Task';

export class CreateTask {
  private readonly _repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this._repository = repository;
  }

  execute(title: string, description: string) {
    const task = Task.create(title, description);
    return this._repository.store(task);
  }
}
