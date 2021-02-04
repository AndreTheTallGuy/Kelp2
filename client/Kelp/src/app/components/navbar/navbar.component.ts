import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(public firebaseService: FirebaseService) {
  
  }
  
  logout() {
    this.firebaseService.logout();
  }

  ngOnInit(): void {
  }

}
