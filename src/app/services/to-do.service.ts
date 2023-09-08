import { Injectable } from '@angular/core';
import { ToDo } from '../model/to_do.model';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  ToDos: Array<ToDo> = [];
  constructor() { }

 addTodo(description: String) {
    let newToDo: ToDo = {
      description: description,
      completed: false,
      created_at: new Date(),
      updated_at: new Date()
    }
    this.ToDos.push(newToDo);
  }

  async deleteTodo(id: String) {

  }

  async updateTodo(id: String) {

  }

  async getTodo(id: String) {

  }

  getAllTodos(): Array<ToDo> {
    return this.ToDos;
  }
}
