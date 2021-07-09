import { ITaskRepository } from '../../../domain/models/task/ITaskRepository';

export class GetTask {
  private readonly _repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this._repository = repository;
  }

  execute(id: string) {
    return this._repository.find(id);
  }
}
