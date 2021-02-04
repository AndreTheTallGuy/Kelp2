import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
    
  }

  public getUserbyEmail(email: string):Observable<any>{
    return this.http.get(`https://localhost:8080/user?email=${email}`);
  }

  public createUser(form: User):Observable<any>{
    return this.http.post(`https://localhost:8080/user/create`, form);
  }

  
  
 
}

