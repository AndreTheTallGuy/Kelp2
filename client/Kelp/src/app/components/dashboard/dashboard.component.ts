import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user?: User;

  constructor(private ss: SessionStorageService, private router: Router, private angularFire: AngularFireAuth) { }

  ngOnInit(): void {
    if(this.ss.get("userInfo")){
      this.user = JSON.parse(this.ss.get("userInfo") || "")
    }else{
      this.router.navigate(['sign-in'])
    }
  }

}
