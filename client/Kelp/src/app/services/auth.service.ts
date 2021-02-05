import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Aquarium } from '../models/Aquarium';
import { Review } from '../models/Review';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
    
  }

  // User Api routes
  public getUserbyEmail(email: string):Observable<any>{
    return this.http.get(`https://localhost:8080/user?email=${email}`);
  }

  public createUser(form: User):Observable<any>{
    return this.http.post(`https://localhost:8080/user/create`, form);
  }

  public updateProfile(form: User): Observable<any>{
    return this.http.put(`https://localhost:8080/user/update`, form);
  }
  
  // Aquarium API routes
  public getAllAquariumsByPage(pageNumber: number):Observable<any>{
    return this.http.get(`https://localhost:8080/aqua?page=${pageNumber}`);
  }
 
  public getAquariumById(id:number):Observable<any>{
    return this.http.get(`https://localhost:8080/aqua/id?aquaId${id}`);
  }

  public addAquarium(form: any):Observable<any>{
    return this.http.post(`http://localhost:8080/aqua/create`, form);
  }

  //Review API Routes
  public getReviewByAquaId(aquaId:number):Observable<any>{
    return this.http.get(`https://localhost:8080/review?aquaId=${aquaId}`);
  }

  public postReview(form:Review):Observable<any>{
    return this.http.post(`https://localhost:8080/review/create`, form);
  }

  //Comment API Routs
  public getCommentsByReviewId(reviewId:number):Observable<any>{
    return this.http.get(`https://localhost:8080/comment?reviewId=${reviewId}`);
  }

  public postComment(form:Comment):Observable<any>{
    return this.http.post(`https://localhost:8080/comment/create`, form);
  }

}

