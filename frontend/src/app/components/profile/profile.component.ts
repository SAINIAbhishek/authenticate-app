import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private _authenticateService: AuthenticateService, private _router: Router) { }

  ngOnInit() {
    this._authenticateService.getUserProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => { //if any error
      console.log(err);
      return false;
    }
  );
  }

}
