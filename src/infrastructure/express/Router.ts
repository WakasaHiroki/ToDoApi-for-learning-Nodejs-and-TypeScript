import express = require('express');
import { TaskController } from '../../interfaces/controllers/TaskController';
import { InMemoryConnection } from '../inmemory/InMemoryConnection';

const connection = new InMemoryConnection();
const taskController = new TaskController(connection);
let router = express.Router();

router.get('/tasks', async (req: express.Request, res: express.Response) => {
  let results = await taskController.findAllTasks(req, res);
  res.send(results);
});

router.get(
  '/tasks/:id',
  async (req: express.Request, res: express.Response) => {
    let result = await taskController.findTask(req, res);
    res.send(result);
  }
);

router.patch(
  '/tasks/:id',
  async (req: express.Request, res: express.Response) => {
    let result = await taskController.updateTask(req, res);
    res.send(result);
  }
);

router.post('/task', async (req: express.Request, res: express.Response) => {
  let result = await taskController.createTask(req, res);
  res.send(result);
});

router.delete(
  '/tasks/:id',
  async (req: express.Request, res: express.Response) => {
    let result = await taskController.deleteTask(req, res);
    res.send(result);
  }
);

export default router;
