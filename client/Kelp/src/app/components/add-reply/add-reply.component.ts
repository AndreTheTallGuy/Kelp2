import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-reply',
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.css']
})
export class AddReplyComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();

  replyFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private angularFire: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.angularFire.user.pipe(takeUntil(this.unsubscribe)).subscribe( res => {
      if(res){
          
        }else{
          this.router.navigate(['sign-in']);
        }
  });
  }

  onSubmit(){
    
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
