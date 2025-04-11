import { Task, type TaskProps } from "../entities/task"; 
import prisma from "../../prisma/queries";

export class CreateTaskController{
  async createTask(props: TaskProps){
    const newTask = new Task(props)
    const { id, title, description, priority, completed, dueDate } = newTask.getProps();

    const task = await prisma.task.create({
      data: {
        id,
        title,
        description,
        priority,
        completed,
        dueDate
      }
    });
    return task
  }

  async listAllTalk(){
    const allTask = await prisma.task.findMany();
    return allTask
  }

  async deleteTask(id:string){
    const findItem = await prisma.task.findUnique({
      where: {
        id,
      }
    })
    if(!findItem){
      return new Error('nenhum item encontra')
    }
    await prisma.task.delete({
      where: {
        id: findItem.id
    }
  })
    return findItem
  }
  async findUniqueTask(id:string){
    const findItem = await prisma.task.findUnique({
      where: {
        id,
      }
    })
    if(!findItem){
      return new Error('nenhum item encontra')
    }
    return findItem
  }
}



