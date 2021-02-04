import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(public firebaseService: FirebaseService) {
  
  }

  signup() {
    this.firebaseService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  

  ngOnInit(): void {
  }

}
