import { Router } from "express";
import { CreateTaskController } from "../controller/create-task-controller";
import { ValidateExpirationDate } from "../utils/validate-date";
import type { TaskProps } from "../entities/task";
import { TransformDataToResponse, type TaskDto } from "../utils/tranform-data-to-response";
import { getPriorityByNumber } from "../Enum/priorityEnum";

const taskRouter = Router();

// taskRouter.get("/teste", (request, response) => {
//   console.log(ValidateExpirationDate())
//   response.status(200).json({ message: "Listada!" });
// });

taskRouter.get("/task", async (request, response) => {
  const createTaskController = new CreateTaskController();

  const alltask = await createTaskController.listAllTalk();
  const allTaskToResponse = TransformDataToResponse(alltask)
  
  response.status(200).json(allTaskToResponse);
});

taskRouter.get("/task/:id", async (request, response) => {
  const {id} = request.params;
  const createTaskController = new CreateTaskController();
  const task = await createTaskController.FindUniqueTask(id);

  if(task instanceof Error){
    response.status(400).json('Não foi possivel listar tasks')
  }else{
    const taskToResponse ={...task,priority: getPriorityByNumber(task.priority)}
    response.status(200).json(taskToResponse);
  }
});

taskRouter.delete("/task/:id", async (request, response) => {
  const {id} = request.params;
  const createTaskController = new CreateTaskController();
  const task = await createTaskController.deleteTask(id);
  
  response.status(200).json(task);
});


taskRouter.post("/task", async (request, response) => {
  const { title, completed, description, priority, dueDate } = request.body;

  const createTaskController = new CreateTaskController();
  const newTask = await createTaskController.createTask({title,completed,description,dueDate,priority});
  const taskToResponse = {...newTask, priority: getPriorityByNumber(newTask.priority)}
  response
    .status(201)
    .json(taskToResponse);
});

taskRouter.put("/task/:id", async (request, response) => {
  const {id} = request.params;
  const { title, completed, description, priority, dueDate } = request.body;

  const task ={
    title,
    completed, 
    description, 
    priority, 
    dueDate
  } as TaskProps
  const createTaskController = new CreateTaskController();

  const taskUpdated = await createTaskController.UpdateTask(id, task);
  if(taskUpdated instanceof Error){
    response.status(400).json('não foi possivel alterar informações')
  }
  else{
    const taskUpdatedToResponse = {...taskUpdated, priority: getPriorityByNumber(taskUpdated.priority)}
    response.status(200).json(taskUpdatedToResponse);

  }

});



export default taskRouter;
