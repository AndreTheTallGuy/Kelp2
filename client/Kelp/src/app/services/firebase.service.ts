import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from './sessionstorage.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user: Observable<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private ss: SessionStorageService
  ) {
    this.user = this.firebaseAuth.authState;
  }

  signup(email: string, password: string, json: any) {
    this.ss.clear();
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.firebaseAuth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('signed into firebase');
            this.firebaseAuth.idToken.subscribe((idToken) => {
             if (idToken) {
                this.ss.set('jwt', idToken);
                this.api.createUser(json, idToken).subscribe(
                  (res: any) => {
                    console.log('3');
                    console.log(email);
                    console.log(this.ss.get('jwt'));
                    console.log('4');

                    this.api.getUserbyEmail(email, this.ss.get('jwt')).subscribe(
                      (res: any) => {
                        console.log('5');
                        this.ss.set('userInfo', JSON.stringify(res));
                        this.router.navigate(['dashboard']);
                      },
                      (error: any) => {
                        console.log(error);
                        this.router.navigate(['']);
                      });
                  },
                  (error: any) => {
                    console.log(error);
                  }
                );
              }
            });
          });
      });
  }

  login(email: string, password: string) {
    console.log('were are in the firebase login');
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => { 
        this.firebaseAuth.idToken.subscribe((idToken) => {
          if (idToken) {
            this.ss.set('jwt', idToken);
            this.api.getUserbyEmail(email, idToken).subscribe(
              (res) => {
                this.ss.set('userInfo', JSON.stringify(res));
                this.router.navigate(['dashboard']);
              },
              (error) => {

                //figure out why it takes you to homepage first then the sign-in page
                console.log(error);
                this.ss.remove("jwt");
                this.firebaseAuth.signOut();
                this.router.navigate(['sign-in']);
                alert("Coudn't sign you in, please try again");
              }
            );
          }
        });
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    this.ss.clear();
  }
}
