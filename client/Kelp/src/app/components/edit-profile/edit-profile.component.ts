import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  email!: string;
  password!: string;
  userName: string = "";
  photo: string = "";
  fishPersonality: string = "";
  location: string = "";
  twitter: string = "";
  facebook: string = "";
  instagram: string = "";
  bio: string ="";
  user?: User;
  form?: User;
  json: any;

  private unsubscribe = new Subject();
  constructor(private ss: LocalStorageService, private angularFire: AngularFireAuth, private router: Router, private firebaseService: FirebaseService) { }

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

  enter(event: any){
    if(event.keyCode == 13){
      event.preventDefault();
      document.getElementById("update")?.click();
    }
  }

  update(){

    this.form = {
      email: this.user!.email,
      userName: this.userName,
      profilePic: this.photo,
      fishPersonality: this.fishPersonality,
      location: this.location,
      twitter: this.twitter,
      facebook: this.facebook,
      instagram: this.instagram,
      bio: this.bio,
    };

    this.json = JSON.stringify(this.form);

    console.log(this.json);

    this.firebaseService.userUpdate(this.json);


  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
