import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  email!: string;
  password!: string;


  constructor(
    public firebaseService: FirebaseService
  ) {}

  login() {
    // add try catch block for both services
    console.log("about to sign int");
    this.firebaseService.login(this.email, this.password);
    // this.email = this.password = '';
    console.log("after the firbase login");
  }


  ngOnInit(): void {}
}
