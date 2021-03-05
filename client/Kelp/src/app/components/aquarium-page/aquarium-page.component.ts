import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { formatDate } from '@angular/common';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { Review } from 'src/app/models/Review';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-aquarium-page',
  templateUrl: './aquarium-page.component.html',
  styleUrls: ['./aquarium-page.component.css']
})
export class AquariumPageComponent implements OnInit {

  aquarium? : Aquarium;
  reviews?: Review[] = undefined;
  aquaId?: any;
  ratingRounded?:number;
  ratings?: number[] = [0];
  reviewBoolean: boolean = false;
  review?: Review;
  rating!: number;
  description!: string;
  dateVisited!: Date;
  datePosted!: Date;
  user?: User;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private transfer: TransferService, private router: Router, private _ngZone: NgZone, private ss: SessionStorageService) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    if(this.ss.get("userInfo")){
      this.user = JSON.parse(this.ss.get("userInfo")||"");
    }

    if(this.transfer.aquaTemp){
      this.aquarium = this.transfer.aquaTemp;
      this.transfer.aquaTemp = undefined;
      this.aquaId = this.aquarium.aquariumID;
    } else {
      
      this.aquaId = this.route.snapshot.paramMap.get('id')
        this.apiService.getAquariumById(this.aquaId).subscribe(res=>{
          this.aquarium = res;
        })
    }

    this.getReviewsAndRatings();
  }

  getReviewsAndRatings(){
    if(this.aquaId){
      this.apiService.getReviewByAquaId(this.aquaId).subscribe(res=>{
        console.log(res);
        this.reviews = res;
        res.forEach((i:any) => this.ratings?.push(i.rating))
        if(this.ratings){
          this.ratingRounded = (this.ratings?.reduce((a,b)=> a+b)/(this.ratings?.length * 5)*100);
        }else{
          this.ratingRounded = 0;
        }
      })

    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  addReview(){
    if(!this.user){
      this.router.navigate(["sign-in"]);
    }
    this.reviewBoolean = !this.reviewBoolean;
    // this.transfer.aquaTemp = this.aquarium;
    // this.router.navigateByUrl("add-review")
  }

  onSubmit(){
    const newReview: Review ={
      aquariumID: this.aquarium?.aquariumID,
      userID: this.user?.id,
      rating: this.rating,
      reviewText: this.description,
      visitedDate: this.dateVisited,
      postedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    const json = JSON.stringify(newReview);
    this.apiService.postReview(json).subscribe(res =>{
      console.log(res);
      this.reviewBoolean = false;
      this.review = res;
      this.getReviewsAndRatings();
    })

  }

  // modalOpen(){
  //   if(this.reviewBoolean){
  //     return {"position":"fixed"}
  //   }else{
  //     return "";
  //   }
  // }

}
