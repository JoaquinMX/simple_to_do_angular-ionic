import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { Router } from "@angular/router";
import { MyValidators } from 'validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  form!: FormGroup;
  token = "";
  incorrectForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.nullValidator], []],
        password: ['', [Validators.required, Validators.nullValidator], []]
    })
  }

  loginAndGetProfile() {
     if (this.form.valid) {
      this.authService.loginAndGetProfile(this.form.value.email ?? "", this.form.value.password ?? "")
      .subscribe(() => {
        if (this.tokenService.getToken()) {
          this.router.navigate(['/home']);
        }

        else {
          this.incorrectForm = true;
        }
      });
      

     }
     else {
      this.form.markAllAsTouched();
     }
  }
}
