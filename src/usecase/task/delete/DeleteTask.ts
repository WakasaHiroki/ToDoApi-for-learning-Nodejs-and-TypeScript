import { ITaskRepository } from '../../../domain/models/task/ITaskRepository';
import { Task } from '../../../domain/models/task/Task';

export class DeleteTask {
  private readonly _repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this._repository = repository;
  }

  async execute(id: string) {
    const task = await this._repository.find(id);

    if (!task) {
      throw new Error('Expect data to be not undefined nor null.');
    }

    const deleted = task.delete();
    this._repository.store(deleted);
  }
}
