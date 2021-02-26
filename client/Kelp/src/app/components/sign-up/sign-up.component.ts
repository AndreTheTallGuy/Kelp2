import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  email!: string;
  password!: string;
  userName!: string;
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
    private ss: SessionStorageService
  ) {}

  signup() {
      // this.email = this.password = " ";
        console.log('1');
        // Send token to your backend via HTTPS
          this.form = {
            email: this.email,
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

          console.log('2');
          
          this.firebaseService.signup(this.email, this.password, this.json);
      }
  ngOnInit(): void {}
}
