import { ITaskRepository } from '../../domain/models/task/ITaskRepository';
import { TaskSerializer } from '../presenters/TaskSerializer';
import { TaskRepository } from '../gateways/inmemory/task/TaskRepository';
import { UpdateTask } from '../../usecase/task/update/UpdateTask';
import { CreateTask } from '../../usecase/task/create/CreateTask';
import { GetTasks } from '../../usecase/task/list/GetTasks';
import { GetTask } from '../../usecase/task/get/GetTask';
import { DeleteTask } from '../../usecase/task/delete/DeleteTask';
import { IDbConnection } from '../gateways/IDbConnection';

export class TaskController {
  private taskSerializer: TaskSerializer;
  private taskRepository: ITaskRepository;

  constructor(connection: IDbConnection) {
    this.taskSerializer = new TaskSerializer();
    this.taskRepository = new TaskRepository(connection);
  }

  async findTask(req: any, res: any) {
    const id = req.params.id;
    const useCase = new GetTask(this.taskRepository);
    let result = await useCase.execute(id);

    return this.taskSerializer.serialize(result);
  }

  async findAllTasks(req: any, res: any) {
    const useCase = new GetTasks(this.taskRepository);
    let results = await useCase.execute();

    return this.taskSerializer.serialize(results);
  }

  async createTask(req: any, res: any) {
    const { title, description } = req.body;
    const useCase = new CreateTask(this.taskRepository);
    let result = await useCase.execute(title, description);

    return this.taskSerializer.serialize(result);
  }

  async updateTask(req: any, res: any) {
    const id = req.params.id;
    const { title, description } = req.body;
    const useCase = new UpdateTask(this.taskRepository);
    let result = await useCase.execute(id, title, description);

    return this.taskSerializer.serialize(result);
  }

  async deleteTask(req: any, res: any) {
    const id = req.params.id;
    const useCase = new DeleteTask(this.taskRepository);
    let result = await useCase.execute(id);

    return this.taskSerializer.serialize(result);
  }
}
