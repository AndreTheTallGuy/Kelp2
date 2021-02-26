import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Review } from 'src/app/models/Review';
import { ApiService } from 'src/app/services/api.service';
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


  constructor(private transfer: TransferService, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.reviewId = this.review?.reviewID;
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
