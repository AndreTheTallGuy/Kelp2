import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(public firebaseService: FirebaseService, public ss: SessionStorageService) {
  
  }
  
  logout() {
    this.firebaseService.logout();
  }

  ngOnInit(): void {
  }

}
