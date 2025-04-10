import { Task } from "../entities/task";

interface CreateTaskRequest {
  title: string;
  description: string;
  priority: number;
  completed: boolean;
  dueDate: Date;
}

type CreateTaskResponse = Task

export class CreateTask{
  async execute({
    title,
    completed,
    description,
    dueDate,
    priority
  }:CreateTaskRequest):Promise<CreateTaskResponse>{
    const newTask = new Task({title,
      completed,
      description,
      dueDate,
      priority
    })

    return newTask
  }
}