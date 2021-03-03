import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;
  private unsubscribe = new Subject();

  constructor(
    private ss: SessionStorageService,
    private router: Router,
    private angularFire: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.angularFire.user.pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (res) {
        if (this.ss.get('userInfo')) {
          this.user = JSON.parse(this.ss.get('userInfo') || '');
        } else {
          this.router.navigate(['sign-in']);
        }
      } else {
        this.router.navigate(['authenticate']);
      }
    });
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
