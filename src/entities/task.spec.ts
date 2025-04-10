import { expect, test } from 'vitest';
import { Task } from './task';

test('Create an task', ()=>{
  const task = new Task({
    title:'task',
    completed:true,
    description: 'fazer tal coisa',
    priority:1,
    dueDate: new Date('11/09/2000')
  })

  expect(task).toBeInstanceOf(Task)
  expect(task.getProps().id).toBeTruthy();
})