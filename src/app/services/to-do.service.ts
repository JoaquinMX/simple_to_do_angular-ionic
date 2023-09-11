import { Injectable } from '@angular/core';
import { ToDo, UpdateToDoDTO } from '../model/to_do.model';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private apiUrl = "http://localhost:3000/to_do";

  private ToDos: Array<ToDo> = [];
  constructor(
    private http: HttpClient,
    private userService: UsersService,
  ) { }

 addTodo(description: String) {
  let completed = false;
  let email = this.userService.getEmail();
  let created_at = Date.now();
  let updated_at = Date.now();
  this.http.post<ToDo>(`${this.apiUrl}/`, 
  {toDo: {description, completed, created_at, updated_at, email}})
  .subscribe(rta => {
    this.ToDos.push(rta);
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
