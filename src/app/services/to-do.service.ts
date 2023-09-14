import { Injectable } from '@angular/core';
import { CreateToDoDTO, ToDo, UpdateToDoDTO } from '../model/to_do.model';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private apiUrl = `${environment.api_url}:${environment.api_port}/to_do`;

  private ToDos: Array<ToDo> = [];
  constructor(
    private http: HttpClient,
  ) { }

  addLocalTodo(description: String, email: String, now_at: Date) {
    let newTodo: ToDo = {
      description: description,
      email: email,
      completed: false,
      created_at: now_at,
      updated_at: now_at,
      _id: `temporal_index${this.ToDos.length}`
    }
  this.ToDos.push(newTodo);
  return this.ToDos;
  }

 addTodo(description: String, email: String, now_at: Date) {
  let newTodo: ToDo = {
    description: description,
    email: email,
    completed: false,
    created_at: now_at,
    updated_at: now_at,
    _id: `temporal_index${this.ToDos.length}`
  }
  this.http.post<ToDo>(`${this.apiUrl}/`, 
  {toDo: {
    description: newTodo.description, 
    email: newTodo.email,
    completed: newTodo.completed, 
    created_at: newTodo.created_at, 
    updated_at: newTodo.updated_at, 
    }})
  .subscribe(rta => {
    this.ToDos[this.ToDos.length - 1] = rta;
    return this.ToDos;
  });
  }

  async getUserToDos(email: string) {
    return this.http.get<Array<ToDo>>(`${this.apiUrl}/byEmail/${email}`);
  }

  setUserToDos(toDos: Array<ToDo>) {
    this.ToDos = toDos;
  }

  getToDos() {
    return this.ToDos;
  }
  async deleteTodo(id: String) {
    return this.http.delete<Array<ToDo>>(`${this.apiUrl}/${id}`);
  }

  async updateTodoDescription(id: String, toDo: UpdateToDoDTO) {
    return this.http.put<ToDo>(`${this.apiUrl}/${id}`, {toDo: toDo});
  }

  async getTodo(id: String) {

  }
}
