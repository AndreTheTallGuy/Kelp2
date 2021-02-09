import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  email!: string;
  password!: string;
  token!: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    // add try catch block for both services
    this.firebaseService.login(this.email, this.password);
    // this.email = this.password = '';

    this.authService.getUserbyEmail(this.email, this.token).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
