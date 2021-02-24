import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { formatDate } from '@angular/common';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Aquarium } from 'src/app/models/Aquarium';
import { Review } from 'src/app/models/Review';
import { ApiService } from 'src/app/services/api.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  aquarium?: Aquarium;
  review?: Review;
  rating!: number;
  description!: string;
  dateVisited!: Date;
  datePosted!: Date;
  

  constructor(private transfer: TransferService, private router: Router, private api: ApiService, private _ngZone: NgZone) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    if(this.transfer.aquaTemp){
      this.aquarium = this.transfer.aquaTemp;
      this.transfer.aquaTemp = undefined;
    }else{
      this.router.navigateByUrl("aquariums");
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit(){
    const newReview: Review ={
      aquariumID: this.aquarium?.aquariumID,
      userID: 1,
      rating: this.rating,
      reviewText: this.description,
      visitedDate: this.dateVisited,
      postedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    const json = JSON.stringify(newReview);
    this.api.postReview(json).subscribe(res =>{
      console.log(res);
      this.router.navigateByUrl(`aquarium/${this.aquarium?.aquariumID}`)
    })

  }

}
