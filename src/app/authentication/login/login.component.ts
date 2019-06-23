import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: FormGroup;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _dataservice: AuthenticationService
  ) {}

  ngOnInit() {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }
  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.required) {
      return 'This field is required';
    }
  }
  onSubmit() {
    this._dataservice
      .login(this.login.value.email, this.login.value.password)
      .subscribe(
        val => {
          if (val) {
            if (this._dataservice.redirectUrl) {
              this.router.navigateByUrl(this._dataservice.redirectUrl);
              this._dataservice.redirectUrl = undefined;
            } else {
              this.router.navigate(['/post/list']);
            }
          } else {
            this.errorMsg = 'Invalid email and/or password.';
          }
        },
        (err: HttpErrorResponse) => {
          this.errorMsg = 'Invalid email and/or password.';
        }
      );
  }
}
