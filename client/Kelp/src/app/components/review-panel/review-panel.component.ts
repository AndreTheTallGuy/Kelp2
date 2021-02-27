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

  constructor(private transfer: TransferService, private router: Router, private api: ApiService, private ss: SessionStorageService) { }

  ngOnInit(): void {
    if(this.ss.get("userInfo")){
      this.user = JSON.parse(this.ss.get("userInfo") || "")
    }

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
