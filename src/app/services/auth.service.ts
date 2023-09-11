import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, CreateUserDTO } from '../model/user.model';
import { Auth } from '../model/auth.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { UsersService } from './users.service';
import { ToDoService } from './to-do.service';
import { response } from 'express';
import { ToDo } from '../model/to_do.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:3000/users";
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UsersService,
    private toDoService: ToDoService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
      })
    );
  }

  profile() {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  loginAndGetProfile(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile())
    )
    .pipe(
      tap(response => {
        this.userService.setUser(response);
      })
    );
  }
}
