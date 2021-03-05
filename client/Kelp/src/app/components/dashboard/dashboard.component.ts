import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { innerSubscribe } from 'rxjs/internal/innerSubscribe';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorageService} from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  user?: User;

  constructor(private ss: LocalStorageService, private router: Router, private angularFire: AngularFireAuth) { }

  ngOnInit(): void {
    this.angularFire.user.pipe(takeUntil(this.unsubscribe)).subscribe( res => {
        if(res && this.ss.get("userInfo") ){
            this.user = JSON.parse(this.ss.get("userInfo") || "");
            res.getIdToken(true).then((res) => {
                  this.ss.set('jwt', res);
            });
        }else{
            this.router.navigate(['sign-in']);
          }
    });
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
