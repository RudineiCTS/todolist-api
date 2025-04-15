import type { Task } from "../entities/task";
import { getPriorityByNumber } from "../Enum/priorityEnum";

export interface TaskDto{
  id:string;
  title: string;
  description: string;
  priority: string | number;
  completed: boolean;
  dueDate: Date;
}
export function TransformDataToResponse(data: TaskDto[]) {
  const dataTransformed = data.map((value) => {
    return {
      ...value,
      priority: getPriorityByNumber(Number(value.priority)),
    } as TaskDto;
  });

  return dataTransformed;
}