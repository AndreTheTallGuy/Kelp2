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
    this.firebaseAuth.setPersistence('session').then(() => {
      this.firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // this method is what keeps firebase updated with who is logging in
          this.firebaseAuth.updateCurrentUser(res.user).then(() => {
          console.log('signed into firebase');
          res.user?.getIdToken(true).then((idToken) => {
            if (idToken) {
              this.ss.set('jwt', idToken);
              this.api.createUser(json).subscribe(
                () => {
                  console.log('3');

                  this.api.getUserbyEmail(email).subscribe(
                    (res: any) => {
                      console.log('4');
                      this.ss.set('userInfo', JSON.stringify(res));
                      this.router.navigate(['dashboard']);
                    },
                    (error: any) => {
                      console.log(error);
                      this.router.navigate(['']);
                    }
                  );
                },
                (error: any) => {
                  console.log(error);
                }
              );
            }
          });
        });
    });
  });
  }

  login(email: string, password: string) {
    console.log('were are in the firebase login');
    this.firebaseAuth.setPersistence('session').then(() => {
      this.firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          // this method is what keeps firebase updated with who is logging in
          this.firebaseAuth.updateCurrentUser(res.user).then(() => {
            res.user?.getIdToken(true).then((idToken) => {
              this.ss.set('jwt', idToken);
              console.log(email);
              this.api.getUserbyEmail(email).subscribe(
                (res) => {
                  this.ss.set('userInfo', JSON.stringify(res));
                  this.router.navigate(['dashboard']);
                },
                (error) => {
                  //figure out why it takes you to homepage first then the sign-in page
                  console.log(error);
                  this.ss.remove('jwt');
                  this.firebaseAuth.signOut();
                  this.router.navigate(['dashboard']);
                  alert("Coudn't sign you in, please try again");
                }
              );
          });
        });
    });
  });
  }

  logout() {
    this.firebaseAuth.signOut();
    this.ss.clear();
  }
}
