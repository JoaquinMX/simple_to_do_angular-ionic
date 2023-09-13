import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../model/user.model';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private apiUrl = `${environment.api_url}:${environment.api_port}/users`;


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
