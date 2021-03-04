import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-reauthenticate',
  templateUrl: './reauthenticate.component.html',
  styleUrls: ['./reauthenticate.component.css']
})
export class ReauthenticateComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private fs: FirebaseService) { }

  ngOnInit(): void {
  }

  authenticate(){
    this.fs.onIdTokenRevocation(this.email,this.password);
  }
}
