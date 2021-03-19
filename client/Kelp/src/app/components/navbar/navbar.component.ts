import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
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
  private unsubscribe = new Subject();

  constructor(private firebaseService: FirebaseService, public ss: LocalStorageService, public angularFire: AngularFireAuth) {
  }
  
  logout() {
    this.firebaseService.logout();
  }

  ngOnInit(): void {interval(3600000)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res) => {
      console.log(res);
      this.angularFire.user.subscribe((res) => {
        if(res){
          console.log("got the token")
          res.getIdToken(true).then((res) => {
          this.ss.set('jwt', res);
          })
        }
      })
    });

  }

  ngOnDestroy(){
      this.unsubscribe.next();
      this.unsubscribe.complete();
  }

}
