import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Aquarium } from '../models/Aquarium';
import { Review } from '../models/Review';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private requestHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    
  }

  async setHeaders() {
    this.requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // User Api routes
  public getUserbyEmail(email: string):Observable<any>{
    return this.http.get(`http://localhost:8080/user?email=${email}`);
  }

  public createUser(form: User):Observable<any>{
    this.setHeaders();
    return this.http.post(`http://localhost:8080/user/create`, form, {headers: this.requestHeaders});
  }

  public updateProfile(form: User): Observable<any>{
    return this.http.put(`http://localhost:8080/user/update`, form);
  }
  
  // Aquarium API routes
  public getAllAquariumsByPage(pageNumber: number):Observable<any>{
    return this.http.get(`http://localhost:8080/aqua?page=${pageNumber}`);
  }
 
  public getAquariumById(id:number):Observable<any>{
    return this.http.get(`http://localhost:8080/aqua/id?aquaId${id}`);
  }

  public addAquarium(form: any):Observable<any>{
    return this.http.post(`http://localhost:8080/aqua/create`, form);
  }

  //Review API Routes
  public getReviewByAquaId(aquaId:number):Observable<any>{
    return this.http.get(`http://localhost:8080/review?aquaId=${aquaId}`);
  }

  public postReview(form:Review):Observable<any>{
    return this.http.post(`http://localhost:8080/review/create`, form);
  }

  //Comment API Routs
  public getCommentsByReviewId(reviewId:number):Observable<any>{
    return this.http.get(`http://localhost:8080/comment?reviewId=${reviewId}`);
  }

  public postComment(form:Comment):Observable<any>{
    return this.http.post(`http://localhost:8080/comment/create`, form);
  }

}

