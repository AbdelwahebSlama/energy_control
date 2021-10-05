import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorMessage = '';

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  creeCompte(): void {
    // this.isLogin = !this.isLogin;
  }

  login(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.non_field_errors;
      },
    );
    // this.router.navigate(['']);
  }

}
