import { v4 } from "uuid";

export interface TaskProps{
  title: string;
  description: string;
  priority: number;
  completed: boolean;
  dueDate: Date;

}

export class Task {
  private props: TaskProps & {id: string};

  constructor(props: TaskProps) {
    this.props = {id: v4(), ...props}
  }
  getProps() {
    return this.props;
  }
}