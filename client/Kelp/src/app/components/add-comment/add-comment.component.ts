import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
// import EventEmitter from 'events';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';
import { TransferService } from 'src/app/services/transfer.service';
import { Comment } from '../../models/Comment'
 
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() reviewId?: any;
  @Input() commentId?: any;
  @Input() margin?: any;
  @Output() outputComment = new EventEmitter();
  @Output() commentHide = new EventEmitter();
  comment!: string;
  newComment?: any;
  commentFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  user?: User;

  constructor(private transfer: TransferService, private api: ApiService, private ss: SessionStorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.ss.get("userInfo")){
      this.user = JSON.parse(this.ss.get("userInfo") || "")
    } else {
      this.router.navigate(['sign-in'])
    }

  }

  onSubmit(){
    if(this.commentId){

      if(this.comment){
        console.log(this.comment);
      
        this.newComment={
          reviewID: this.reviewId,
          userID: this.user?.id,
          replyID: this.commentId,
          comment: this.comment,
          postedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          margin: this.margin + 40
        }
        const json:any = JSON.stringify(this.newComment);
        console.log(json);
        
        this.api.postComment(json).subscribe(res => {
          console.log(res);
          this.outputComment.emit(this.newComment);
          this.commentHide.emit();
        })
    
      }else{
        console.log("empty comment");
        
      }
      
    }else{

      if(this.comment){
        console.log(this.comment);
        
        this.newComment={
          reviewID: this.reviewId,
          userID: this.user?.id,
          replyID: undefined,
          comment: this.comment,
          postedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          margin: 40
        }
        const json:any = JSON.stringify(this.newComment);
        this.api.postComment(json).subscribe(res => {
          console.log(res);
          this.outputComment.emit(this.newComment);
          this.commentHide.emit();
        })
    
      }else{
        console.log("empty comment");
        
      }
    }
    }

}
