import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {


  set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  get(key: string) {
    return sessionStorage.getItem(key);
  }

  remove(key: string) {
      sessionStorage.removeItem(key);
  }

  clear(){
    sessionStorage.clear();
  }

  // existingData(key: string): Observable<any>{
  //   if(sessionStorage.getItem(key)){
  //     return 1
  //   }else{
  //     return false;
  //   }
  // }


  constructor() { 
    
  }
}
