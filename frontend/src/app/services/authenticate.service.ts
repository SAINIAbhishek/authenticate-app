import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticateService {
  authenticateToken: any;
  user: any;

  constructor(private http: Http) { }

  //function to register the user, this is where we reach into our backend api and make a post request
  registerUser(user){
    //set the header value
    let headers = new Headers();
    //content type of JSON
    headers.append('Content-Type','application/json');
    //return observable with the response
     return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).map(res => res.json());
  }

  //profile
  getUserProfile(){
    let headers = new Headers();
    this.loadUserToken();//now we have access to the user token
    headers.append('Authorization', this.authenticateToken);//sending the token with the request
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}).map(res => res.json());
  }

  //fetch token from local storage
  loadUserToken(){
    const token = localStorage.getItem('token');
    this.authenticateToken = token;
  }

  //functon to check the user exist in our database or not
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).map(res => res.json());
  }

  //function to store the user data locally
  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authenticateToken = token;
    this.user = user;
  }

  //functon to logout
  logout(){
    this.authenticateToken = null;
    this.user = null;
    localStorage.clear();
  }

  //checked user logged in
  loggedIn() {
    return tokenNotExpired();
  }

}
