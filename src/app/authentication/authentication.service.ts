import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../post/user.model';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _tokenKey = 'currentUserToken';
  private readonly _userKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        localStorage.removeItem(this._userKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
  }
  checkEmailAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );
  };

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }
  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }
  getUser$(email: string): Observable<User> {
    return this.http
      .get(`${environment.apiUrl}/user/${email}`)
      .pipe(map((usr: any): User => User.fromJSON(usr)));
  }
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account`,
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this.getUser$(email).subscribe(user => {
              this._user$.next(user.firstName);
              localStorage.setItem(
                this._userKey,
                JSON.stringify(user)
              );
            });
            return true;
          } else {
            return false;
          }
        })
      );
  }
  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account/register`,
        {
          firstname,
          lastname,
          email,
          password,
          passwordConfirmation: password
        },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this.getUser$(email).subscribe(user => {
              this._user$.next(user.firstName);
              localStorage.setItem(
                this._userKey,
                JSON.stringify(user)
              );
            });
            return true;
          } else {
            return false;
          }
        })
      );
  }
  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      localStorage.removeItem(this._userKey);
      this._user$.next(null);
    }
  }

}
