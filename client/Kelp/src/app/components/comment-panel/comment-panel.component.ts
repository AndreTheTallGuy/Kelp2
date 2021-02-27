import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-comment-panel',
  templateUrl: './comment-panel.component.html',
  styleUrls: ['./comment-panel.component.css']
})
export class CommentPanelComponent implements OnInit {

  @Input() comment?:Comment;
  @Input() reply?: Comment;
  @Input() reviewId?: any;
  replyBoolean: boolean = false;
  commentId?:any;
  replyId?: any;
  comments?: Comment[];
  margin?:number;
  user?: User;

  constructor(private api: ApiService, private ss: SessionStorageService) { }

  ngOnInit(): void {
    if(this.ss.get("userInfo")){
      this.user = JSON.parse(this.ss.get("userInfo") || "")
    }

    this.margin = this.comment?.margin;
    
    this.commentId = this.comment?.commentID;
    this.replyId = this.comment?.replyID
        
    if(this.commentId){
      this.api.getCommentsByReplyId(this.commentId).subscribe(res=> {
        this.comments = res;
        // console.log(this.replies);
      })
    }
    
  }

  addReply(){
    this.replyBoolean = !this.replyBoolean;
    
  }

  outputComment(comment: any){
    this.comments?.push(comment);
    
  }

  onSubmit(){

  }
  arrowUp(){
    console.log("arrow up");
    
  }
  arrowDown(){
    console.log("arrow down");
    
  }
}
