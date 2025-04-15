import { describe, it, expect, beforeAll, afterAll } from "vitest";
import prisma from "../../prisma/queries";
import { Task, type TaskProps } from "../entities/task";
import { CreateTaskController } from "./create-task-controller";

const createTaskController = new CreateTaskController();
describe("CreateTaskController - Integração", () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.task.create({
      data:{
        id:'6367402f-347d-4f7b-bcf0-603bc8a4eb47',
        title: "Tarefa inicial",
        description: "Essa tarefa é fixa no banco de testes",
        priority: 1,
        completed: false,
        dueDate: new Date("2025-04-20")
      }
    })
  });

  afterAll(async () => {
    await prisma.task.deleteMany(); 
    await prisma.$disconnect();
  });

  it("deve criar uma tarefa com dados válidos", async()=>{
    const taskData:TaskProps = {
      title:"taskexemplo",
      completed:true,
      description:"task exemplificada",
      dueDate:new Date("11/09/2000"),
      priority:1,
    }

    const result = await createTaskController.createTask(taskData);
    
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(taskData.title);
    expect(result.description).toBe(taskData.description)
  })

  it("deve trazer todas as tarefas salvas", async()=>{

    const result = await createTaskController.listAllTalk();
    expect(Array.isArray(result)).toBe(true);
  })

  it("deve ser possivel deletar uma task", async()=>{
    const newTask = new Task({
      title: "Para deletar",
      description: "Será excluída",
      priority: 1,
      completed: false,
      dueDate: new Date(),
    })
    const {id,completed,description,priority,dueDate,title} = newTask.getProps()
    const task = await prisma.task.create({
      data: {
        id,
        title,
        description,
        priority,
        completed,
        dueDate,
      },
    });

    await createTaskController.deleteTask(task.id);
    
    const taskAfterDelete = await prisma.task.findUnique({
      where:{id}
    })
    expect(taskAfterDelete).toBeNull();
  })

  it("deve ser possivel buscar uma task especifica", async()=>{
    const id = "6367402f-347d-4f7b-bcf0-603bc8a4eb47"

    const result = await createTaskController.FindUniqueTask(id);

    expect(result).toHaveProperty('id');
    expect(Array.isArray(result)).toBe(false);
  })

  it("deve ser possivel alterar dados da task", async()=>{
    const newDataForTask = {
      title:"taskUpdate",
      completed:true,
      description:"task updated",
      dueDate:new Date("11/09/2000"),
      priority:2,
    } as TaskProps
    const id = "6367402f-347d-4f7b-bcf0-603bc8a4eb47";

    const findTask = await prisma.task.findUnique({
      where:{
        id
      }
    })
    const result = await createTaskController.UpdateTask(findTask!.id, newDataForTask)
    if(result instanceof Error){
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Task não encontrada");
    }else{
      expect(result.title).toBe('taskUpdate')
      expect(result.description).toBe("task updated");
    }    
  })
})