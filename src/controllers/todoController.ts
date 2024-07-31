import { Request, Response } from 'express';
import Todo from '../models/todo';

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.findAll({ where: { userId: Number(req.user?.id) } });
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const newTodo = await Todo.create({ title, completed: false, userId: Number(req.user?.id) });
  res.status(201).json(newTodo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  if (title) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  await todo.save();
  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  await todo.destroy();
  res.status(204).send();
};
