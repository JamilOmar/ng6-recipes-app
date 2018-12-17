import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  private token = null;

  singupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }
  async singinUser(email: string, password: string) {
    const response =  await firebase.auth().signInWithEmailAndPassword(email , password);
    this.token = await firebase.auth().currentUser.getIdToken();
    this.router.navigate(['/']);
  }

  getToken() {
    return this.token;
  }
  isAuthenticated() {
    return this.token != null;
  }
  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
  constructor(private router: Router) { }
}
