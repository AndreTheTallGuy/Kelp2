import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  email!: string;
  password!: string;
  displayName!: string;
  photo!: string;
  fishPersonality!: string;
  location!: string;
  twitter!: string;
  facebook!: string;
  instagram!: string;
  bio!: string;
  form?: User;
  json: any;

  constructor(
    public firebaseService: FirebaseService,
    private apiservice: ApiService,
    private router: Router,
    private angularFA: AngularFireAuth
  ) {}

  signup() {
    this.firebaseService.signup(this.email, this.password);
    // this.email = this.password = '';

    this.form = {
      email: this.email,
      displayName: this.displayName,
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


    this.apiservice.createUser(this.json).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );

    this.router.navigate(['dashboard']);
  }

  ngOnInit(): void {}
}
