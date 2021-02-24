import { Injectable } from '@angular/core';
import { Aquarium } from '../models/Aquarium';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  aquaTemp?: Aquarium = undefined;
  reviewTemp?: Review = undefined;

  constructor() { }
}
