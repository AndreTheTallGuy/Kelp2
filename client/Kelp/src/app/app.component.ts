import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Kelp';
 
  constructor(public firebaseService: FirebaseService) {
    
  }
    
  ngOnInit(): void {
       
  }


}
