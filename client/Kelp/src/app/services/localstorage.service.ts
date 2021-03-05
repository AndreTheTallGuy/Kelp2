import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
      localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
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
