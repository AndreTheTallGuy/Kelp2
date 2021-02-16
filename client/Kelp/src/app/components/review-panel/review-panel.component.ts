import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-review-panel',
  templateUrl: './review-panel.component.html',
  styleUrls: ['./review-panel.component.css']
})
export class ReviewPanelComponent implements OnInit {

  @Input()
  review?: Review;

  constructor() { }

  ngOnInit(): void {
  }

}
