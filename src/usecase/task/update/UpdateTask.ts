import { ITaskRepository } from '../../../domain/models/task/ITaskRepository';

export class UpdateTask {
  private readonly _repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this._repository = repository;
  }

  async execute(id: string, title: string, description: string) {
    const task = await this._repository.find(id);

    if (!task) {
      throw new Error('Expect data to be not undefined nor null.');
    }

    const updated = task.update(title, description);
    this._repository.store(updated);
  }
}
