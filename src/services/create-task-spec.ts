import { describe, expect, it } from "vitest";
import { CreateTask } from "./create-task";
import { Task } from "../entities/task";

describe('Create Task', ()=> {
  it('should be able to create an Task', ()=>{
    const createTask = new CreateTask();

    expect(createTask.execute({
      title:'teste',
      completed:true,
      description: 'fazer tal coisa',
      priority:1,
      dueDate: new Date('11/09/2000')
    })).resolves.toBeInstanceOf(Task)
  })
})