import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  loggedInUser$ = this._authenticationService.user$;

  constructor(private _authenticationService: AuthenticationService) {}

  ngOnInit() {}
  logout() {
    this._authenticationService.logout();
  }
}
