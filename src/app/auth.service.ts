import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<firebase.User>;
  public currentUser: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.currentUserSubject = new BehaviorSubject<firebase.User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        user.getIdToken().then(tok=>{
          // console.log(tok);          
        })
        this.currentUserSubject.next(user);
        
      } else {
        localStorage.setItem('currentUser', null);
      }
    });

    setInterval(() => {
      this.getToken()
    }, 3000);

   }

  public get currentUserValue(): firebase.User {
    this.currentUserSubject.value;
    return this.currentUserSubject.value;
  }

  async doGoogleLogin(){
    
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      await this.afAuth.auth
      .signInWithPopup(provider).then(result=>{
        result.user.getIdToken().then(tok=>{
          localStorage.setItem('Token','JWT '+ tok);
        })
      })
      return true;
  }

  getToken(){
    this.currentUserSubject = new BehaviorSubject<firebase.User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        user.getIdToken(true).then(tok=>{
          localStorage.setItem('Token','JWT ' +tok);   
          // console.log(tok)     
        })
        this.currentUserSubject.next(user);
        
      } else {
        localStorage.setItem('currentUser', null);
      }
    });
  }

  async logout() {
    // remove user from local storage to log user out
    await this.afAuth.auth.signOut().then(response => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('user');
      localStorage.removeItem('Token');
      this.currentUserSubject.next(null);
      return true;
    });

  }

}
