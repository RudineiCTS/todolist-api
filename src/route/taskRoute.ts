import { Router } from "express";

const taskRouter = Router();

taskRouter.get("/task", (request, response) => {
  response.status(200).json({ message: "Listada!" });
});

taskRouter.post("/task", (request, response) => {
  const { title, completed, description, priority, dueDate } = request.body;

  response
    .status(201)
    .json({ title, completed, description, priority, dueDate });
});

export default taskRouter;
