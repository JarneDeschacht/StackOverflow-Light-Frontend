import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import {
  AbstractControl,
  ValidatorFn,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('passwordconfirm');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}
function serverSideValidateEmail(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}
export const isValidPassword = (c: FormControl) => {
  const password = c.value;
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)
    ? null
    : { InvalidPassword: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.register = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(80)]],
      lastname: ['', [Validators.required, Validators.maxLength(80)]],
      email: [
        '',
        [Validators.required, Validators.email],
        serverSideValidateEmail(this.authService.checkEmailAvailability)
      ],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [Validators.required, Validators.minLength(8), isValidPassword]
          ],
          passwordconfirm: ['', [Validators.required]]
        },
        { validator: comparePasswords }
      )
    });
  }
  get firstname() {
    return this.register.get('firstname');
  }
  get lastname() {
    return this.register.get('lastname');
  }
  get email() {
    return this.register.get('email');
  }
  get password() {
    return this.register.get('passwordGroup').get('password');
  }
  get passwordconfirm() {
    return this.register.get('passwordGroup');
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.required) {
      return 'This field is required';
    } else if (errors.minlength) {
      return `Minimum length is ${errors.minlength.requiredLength} 
        characters (now ${errors.minlength.actualLength})`;
    } else if (errors.userAlreadyExists) {
      return `User already exists`;
    } else if (errors.maxlength) {
      return `Maximum length is ${errors.maxlength.requiredLength} 
        characters (now ${errors.maxlength.actualLength})`;
    } else if (errors.email) {
      return `This is not a valid email`;
    } else if (errors.passwordsDiffer) {
      return `Passwords are not the same`;
    } else if (errors.InvalidPassword) {
      return 'Password must contain at least 1 number, 1 captial letter and 1 small letter';
    }
  }
  onSubmit() {
    this.authService
      .register(
        this.register.value.firstname,
        this.register.value.lastname,
        this.register.value.email,
        this.register.value.passwordGroup.password
      )
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/post/list']);
            }
          } else {
            this.errorMsg = `Something went wrong`;
          }
        },
        (err: HttpErrorResponse) => {
          this.errorMsg = 'Something went wrong';
        }
      );
  }
}
