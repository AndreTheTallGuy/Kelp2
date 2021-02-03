import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(public authService: AuthService) {
  
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  

  ngOnInit(): void {
  }

}
