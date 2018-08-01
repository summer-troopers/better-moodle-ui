import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@modules/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if (this.authenticationService.isAuthenticated()) {
      return this.router.navigateByUrl('home');
    }
    this.error = false;
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.submitLoginDate(this.loginForm.value).subscribe(data => {
      this.authenticationService.login(data);
      this.authenticationService.setUser(data);
      this.router.navigateByUrl('home')
        .catch(console.error);
    }, error => {
      this.error = true;
      console.log(error);
    });
  }
}
