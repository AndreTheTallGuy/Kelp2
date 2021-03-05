import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { Aquarium } from 'src/app/models/Aquarium';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-aquariums',
  templateUrl: './aquariums.component.html',
  styleUrls: ['./aquariums.component.css']
})
export class AquariumsComponent implements OnInit {

  @ViewChild('aquaSearchInput', { static: true })
  aquaSearchInput!: ElementRef;

  aquariums?: Aquarium[];
  pageNumber:number = 0;
  isLoading:boolean = false;
  noRes: boolean = false;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.pageNumber = 0;

    fromEvent(this.aquaSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(500)
      // If previous query is diffent from current   
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((name: string) => {

      this.isLoading = true;
      this.noRes = false;

      this.apiService.getAquariumByName(name).subscribe((res: any) => {
        console.log('res', res);
        this.isLoading = false;
        this.aquariums = res;
        
        if(res.length == 0){
          this.noRes = true;
        }
      }, (err: any) => {
        this.isLoading = false;
        console.log('error', err);
        
      });

    });

  }

  browse(){
    // this.pageNumber+=1;
    this.isLoading = true;
    this.apiService.getAllAquariumsByPage(this.pageNumber).subscribe(res =>{
      console.log(res.content);
      this.isLoading = false;
      this.aquariums = res.content;
      
    })
  }

}
