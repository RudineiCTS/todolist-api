import { Router } from "express";
import { CreateTaskController } from "../controller/create-task-controller";
import { ValidateExpirationDate } from "../utils/validate-date";

const taskRouter = Router();

taskRouter.get("/teste", (request, response) => {
  console.log(ValidateExpirationDate())
  response.status(200).json({ message: "Listada!" });
});

taskRouter.get("/task", async (request, response) => {
  const createTaskController = new CreateTaskController();

  const alltask = await createTaskController.listAllTalk();
  
  response.status(200).json(alltask);
});

taskRouter.get("/task/:id", async (request, response) => {
  const {id} = request.params;
  const createTaskController = new CreateTaskController();
  const task = await createTaskController.findUniqueTask(id);
  
  response.status(200).json(task);
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
  console.log(ValidateExpirationDate())
  response
    .status(201)
    .json(newTask);
});


export default taskRouter;
