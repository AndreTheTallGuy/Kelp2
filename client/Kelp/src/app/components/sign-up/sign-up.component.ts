import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
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

  constructor(public firebaseService: FirebaseService, private authservice: AuthService, private router: Router) {
  
  }

  signup() {
    this.firebaseService.signup(this.email, this.password);
    this.email = this.password = '';

    this.form = {
      email: this.email,
      displayName: this.displayName,
      profilePic: this.photo,
      fishPersonality: this.fishPersonality,
      location: this.location,
      twitter: this.twitter,
      facebook: this.facebook,
      instagram: this.instagram,
      bio: this.bio
    }
    
    this.json = JSON.stringify(this.form);
    console.log(this.json);
    
    this.authservice.createUser(this.json).subscribe(res=>{
      console.log(res);
      this.router.navigate(['aquariums']);
    }, error =>{
      console.log(error);      
    })

  }

  

  ngOnInit(): void {
  }

}
