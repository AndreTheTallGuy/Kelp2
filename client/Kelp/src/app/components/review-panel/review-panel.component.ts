import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Review } from 'src/app/models/Review';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService} from 'src/app/services/localstorage.service';
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
  poster!: User;
  upvotes!: string[];
  downvotes!: string[];
  votes!: number;
  isGoldUp: boolean = false;

  constructor(private transfer: TransferService, private router: Router, private api: ApiService, private ss: LocalStorageService) { }

  ngOnInit(): void {
    if(this.ss.get("userInfo")){
      this.user = JSON.parse(this.ss.get("userInfo") || "");
    }

    this.upvotes = this.review?.upvotes?.split(",") || [];
    this.downvotes = this.review?.downvotes?.split(",") || [];
    this.votes = (this.upvotes?.length || 0 ) - (this.downvotes?.length ||0); 

    if(this.upvotes.includes(this.user?.id?.toString() || "")){
      this.isGoldUp = true;
    }

    this.api.getUserById(this.review?.userID).subscribe(res =>{
    console.log(res);
    this.poster = res;
    
    })
    
    this.reviewId = this.review?.reviewID;
    
    this.api.getCommentsByReviewId(this.reviewId).subscribe(res =>{
      this.comments = res.filter((item:any) => item.replyID == 0);
    })
  }
  
  addComment(){
    this.commentBoolean = !this.commentBoolean;
   
  }

  outputComment(comment:any){
    // console.log(comment);
    // this.comments?.push(comment);
    this.api.getCommentsByReviewId(this.reviewId).subscribe(res =>{
      this.comments = res.filter((item:any) => item.replyID == 0);
    })
  }

  arrowUp(){
    if(!this.user){
      this.router.navigate(["sign-in"]);
    }else{
      if(this.upvotes?.includes(this.user.id!.toString())){
        this.upvotes.splice(this.upvotes.indexOf(this.user.id!.toString()),1);
        if(this.upvotes.length == 0){ this.upvotes = ["0"]};
        this.api.updateReviewUpvotes(this.reviewId, this.upvotes.toString()).subscribe(res => {
          console.log(res);
        });
        console.log(this.upvotes);
        this.isGoldUp = false;
        this.votes -= 1;
        
      } else{
        this.upvotes!.push(this.user.id!.toString());
        this.api.updateReviewUpvotes(this.reviewId, this.upvotes.toString()).subscribe(res => {
          console.log(res);
        });
        console.log(this.upvotes);
        this.isGoldUp = true;
        this.votes += 1;
      }
    }
    
    
  }

  arrowDown(){
    console.log("arrow down");
    this.isGoldUp = false;
  }
 
}
