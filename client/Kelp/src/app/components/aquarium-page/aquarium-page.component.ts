import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aquarium } from 'src/app/models/Aquarium';
import { Review } from 'src/app/models/Review';
import { ApiService } from 'src/app/services/api.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-aquarium-page',
  templateUrl: './aquarium-page.component.html',
  styleUrls: ['./aquarium-page.component.css']
})
export class AquariumPageComponent implements OnInit {

  aquarium? : Aquarium;
  reviews?: Review[] = undefined;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private transfer: TransferService, private router: Router) { }

  ngOnInit(): void {
    if(this.transfer.aquaTemp){
      this.aquarium = this.transfer.aquaTemp;
      this.transfer.aquaTemp = undefined;
    } else {
      let id = this.route.snapshot.paramMap.get('id')
      console.log(id);
      if (id == null){
        console.log(null);
      } else{
        const numId: number = parseInt(id);
        this.apiService.getAquariumById(numId).subscribe(res=>{
          this.aquarium = res;
        })
      }
    }
  }

  addReview(){
    this.transfer.aquaTemp = this.aquarium;
    this.router.navigateByUrl("add-review")
  }

}
