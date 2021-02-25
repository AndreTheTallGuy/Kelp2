import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user: Observable<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private ls: LocalstorageService
  ) {
    this.user = this.firebaseAuth.authState;
    
  }

  signup(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }



  login(email: string, password: string) {
    console.log('were are in the firebase login');
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password).then(res =>{
      this.firebaseAuth.idToken.subscribe( (idToken) => {

        if(idToken){
        this.ls.set("jwt", idToken);
        this.api.getUserbyEmail(email, idToken).subscribe(
          (res) => {
            console.log(res);
            this.ls.set("userInfo", res)
            this.router.navigate(['dashboard']);
          },
          (error) => {
            console.log(error);
          }
        );
        }
      })
    })
  }

  logout() {
    this.ls.remove("jwt");
    this.ls.remove("userInfo");
    this.firebaseAuth.signOut();
  }
}
