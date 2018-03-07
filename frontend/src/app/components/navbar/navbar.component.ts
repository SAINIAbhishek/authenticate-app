import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _flashMessagesService: FlashMessagesService,
  private _authenticateService: AuthenticateService, private _router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this._authenticateService.logout();
    this._flashMessagesService.show('You are logged out successfully!', { cssClass: 'alert-success' } );
    this._router.navigate(['/login']);
    return false;
  }
}
