import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(public firebaseService: FirebaseService, private router: Router) {
  
  }

  login() {
    this.firebaseService.login(this.email, this.password);
    // this.email = this.password = ''; 
    
    this.router.navigate(['dashboard']);
  }

  ngOnInit(): void {
  }

}
