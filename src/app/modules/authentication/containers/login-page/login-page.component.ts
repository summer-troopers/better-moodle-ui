import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@modules/authentication/authentication.service';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@shared/constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  isRequestError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.initForm();
    if (this.authenticationService.isAuthenticated()) {
      return this.router.navigateByUrl('home');
    }
  }

  get formErrors() {
    return this.loginForm.controls;
  }

  get emailErrors() {
    return this.formErrors.email.errors;
  }

  get passwordErrors() {
    return this.formErrors.password.errors;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.value).subscribe(data => {
      this.authenticationService.insertLocalStorage(data.token, TOKEN_STORAGE_KEY);
      this.authenticationService.insertLocalStorage(data.userData, USER_STORAGE_KEY);
      this.router.navigateByUrl('home')
        .catch(console.error);
    }, error => {
      this.isRequestError = true;
      console.log(error);
    });
  }
}
