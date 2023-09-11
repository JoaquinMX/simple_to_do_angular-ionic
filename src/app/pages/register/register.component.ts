import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserDTO } from 'src/app/model/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  token = "";
  incorrectForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.nullValidator], []],
        email: ['', [Validators.required, Validators.email, Validators.nullValidator], []],
        password: ['', [Validators.required, Validators.nullValidator, Validators.minLength(6)], []],
        repeatPassword: ['',[Validators.required, Validators.nullValidator], []]
    })
  }

  register() {
    if (this.form.valid && this.form.value.password === this.form.value.repeatPassword) {
      const newUser: CreateUserDTO = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password
      }
      console.log(this.form.value);
      this.usersService.create(newUser).subscribe((user) => {
        if (user) {
          this.router.navigate(['/login']);
        }
      })
    } 
     else {
      this.form.markAllAsTouched();
     }
  }
}
