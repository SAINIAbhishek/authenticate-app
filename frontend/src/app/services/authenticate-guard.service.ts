import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticateService} from './authenticate.service';

@Injectable()
export class AuthenticateGuardService implements CanActivate {

  constructor(private _authenticateService: AuthenticateService, private _router: Router) { }

  canActivate() {
    if(this._authenticateService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}
