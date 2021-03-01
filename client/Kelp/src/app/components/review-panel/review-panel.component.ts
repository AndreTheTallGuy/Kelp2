import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Review } from 'src/app/models/Review';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-review-panel',
  templateUrl: './review-panel.component.html',
  styleUrls: ['./review-panel.component.css']
})
export class ReviewPanelComponent implements OnInit {

  @Input() review?: Review;
  reviewId?: any;
  commentBoolean?: boolean = false;
  comment?: string;
  comments?: Comment[];
  user?: User;
  upvotes?: number[];
  downvotes?: number[];

  constructor(private transfer: TransferService, private router: Router, private api: ApiService, private ss: SessionStorageService) { }

  ngOnInit(): void {

    this.upvotes = this.review?.upvotes;
    this.downvotes = this.review?.downvotes;
    console.log(this.upvotes);
    console.log(this.downvotes);
    

    this.api.getUserById(this.review?.userID).subscribe(res =>{
      console.log(res);
      this.user = res;
      
    })
    console.log(this.review?.userID);
    
    this.reviewId = this.review?.reviewID;
    console.log(this.reviewId);
    
    this.api.getCommentsByReviewId(this.reviewId).subscribe(res =>{
      console.log(res.filter((item:any) => item.replyID == 0));
      this.comments = res.filter((item:any) => item.replyID == 0);
    })
  }
  
  addComment(){
    this.commentBoolean = !this.commentBoolean;
   
  }

  outputComment(comment:any){
    console.log(comment);
    this.comments?.push(comment);
  }

  arrowUp(){
    console.log("arrow up");
    
  }

  arrowDown(){
    console.log("arrow down");
    
  }
 
}
