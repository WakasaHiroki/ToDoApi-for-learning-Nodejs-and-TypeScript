import moment = require('moment-timezone');
import { Task } from '../../domain/models/task/Task';

const _serializeSingletask = (task: Task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    operatedAt: moment(task.operatedAt).tz('Asia/Tokyo').format()
  };
};

export class TaskSerializer {
  serialize(data: any) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null.');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingletask);
    }
    return _serializeSingletask(data);
  }
}
