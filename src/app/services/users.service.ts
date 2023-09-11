import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../model/user.model';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private apiUrl = "http://localhost:3000/users";


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, {"users": dto});
  }

  setUser(user: User) {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);

  }

  logOut() {
    this.tokenService.deleteToken();
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getName() {
    return localStorage.getItem('name');
  }
}
