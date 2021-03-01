import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reply',
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.css']
})
export class AddReplyComponent implements OnInit {

  replyFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private angularFire: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.angularFire.user.subscribe(
      (res) =>{
        if(res){
          //do nothing
        }else {
          this.router.navigate(['authenticate']);
        }
    });
  }

  onSubmit(){
    
  }
}
