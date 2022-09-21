import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, ILoginForm } from './interface/login.interface';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: boolean;

  loginForm: FormGroup<ILoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loading = false;
    this.loginForm = this.loginService.buildFormLogin();
  }

  @HostListener('submit')
  private onSubmitLogin(): void {
    if(this.loginForm.valid) {
      this.loading = true;
      this.loginService.onLoginUser(this.loginForm.value as ILogin).subscribe(() => {
        this.loading = false;
        void this.router.navigate(['home']);
      }, () => {
        this.loginForm.markAllAsTouched();
        this.loading = false;
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit() {
  }

}
