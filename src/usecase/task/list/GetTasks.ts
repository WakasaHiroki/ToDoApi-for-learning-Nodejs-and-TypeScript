import { ITaskRepository } from '../../../domain/models/task/ITaskRepository';

export class GetTasks {
  private readonly _repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this._repository = repository;
  }

  execute() {
    return this._repository.findAll();
  }
}
