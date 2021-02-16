import { Injectable } from '@angular/core';
import { Aquarium } from '../models/Aquarium';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  aquaTemp?: Aquarium = undefined;

  constructor() { }
}
