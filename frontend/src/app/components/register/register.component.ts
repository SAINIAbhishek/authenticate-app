import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //create property for each field
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private _validateService: ValidateService, private _flashMessagesService: FlashMessagesService,
  private _authenticateService: AuthenticateService, private _router: Router) { }

  ngOnInit() {
  }

  onRegister(){
    //we create the object from these fields so that we can submit into our request
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //required fields
    if(!this._validateService.validateRegister(user)){
      this._flashMessagesService.show('Please fill in all details.', { cssClass: 'alert-danger' } );
      return false;
    }

    //validate email
    if(!this._validateService.validateEmail(user.email)){
      this._flashMessagesService.show('Please use a valid email.', { cssClass: 'alert-danger' } );
      return false;
    }

    //regiter user
    this._authenticateService.registerUser(user).subscribe(data => {
      if(data.success){
        this._flashMessagesService.show('User registered successfully!', { cssClass: 'alert-success' } );
        this._router.navigate(['/login'])
      } else{
        this._flashMessagesService.show('Something went wrong, please try again later!', { cssClass: 'alert-danger' } );
        this._router.navigate(['/register'])
      }
    });

  }

}
