import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  email!: string;
  password!: string;

  constructor(private firebaseService: FirebaseService, public ss: LocalStorageService, public angularFire: AngularFireAuth) {
  }
  
  logout() {
    this.firebaseService.logout();
  }

  ngOnInit(): void {interval(3600000)
    .pipe(takeWhile(() => !stop))
    .subscribe((res) => {
      console.log(res);
      this.angularFire.user.subscribe((res) => {
        if(res){
          res.getIdToken(true).then((res) => {
            this.ss.set('jwt', res);
          })
        }
      })
    });

    if(this.ss.get('jwt') || this.ss.get('userInfo')){
          //nothing
    }else{
      
    }

  }

  ngOnDestroy(){

  }

}
