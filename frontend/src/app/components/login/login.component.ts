import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private _flashMessagesService: FlashMessagesService,
  private _authenticateService: AuthenticateService, private _router: Router) { }

  ngOnInit() {
  }

  onLogin(){
    const user = {
      username: this.username,
      password: this.password
    }

    this._authenticateService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this._authenticateService.storeUserData(data.token, data.user);
        this._flashMessagesService.show('Welcome!', { cssClass: 'alert-success' } );
        this._router.navigate(['/profile']);
      } else{
        this._flashMessagesService.show('User and password do not match!', { cssClass: 'alert-danger' } );
        this._router.navigate(['/login']);
      }
    });
  }

}
