import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aquarium } from 'src/app/models/Aquarium';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-aquarium-panel',
  templateUrl: './aquarium-panel.component.html',
  styleUrls: ['./aquarium-panel.component.css']
})
export class AquariumPanelComponent implements OnInit {

  @Input()
  aquarium?: Aquarium;

  constructor(private router: Router, private transfer: TransferService) { }

  ngOnInit(): void {
  }

  viewAqua(){
    this.transfer.aquaTemp = this.aquarium;
    this.router.navigateByUrl(`aquarium/${this.aquarium?.aquariumID}`)

  }

}
