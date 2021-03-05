import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { SessionStorageService } from './sessionstorage.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient, private ss: SessionStorageService) {
    
  }


  // User Api routes
  public getUserbyEmail(email: string, token: any): Observable<any> {
    console.log(email);
    return this.http.get(`http://localhost:8080/user/email/${email}/${token}`, this.userOptions);
  }

  public getUserById(id:any): Observable<any> {
    return this.http.get(`http://localhost:8080/user/${id}`)
  }

  public createUser(form: User, token: any): Observable<any> {
    console.log('we got to create user');
    return this.http.post(`http://localhost:8080/user/create/${token}`, form, this.userOptions);
  }

  public updateProfile(form: User): Observable<any> {
    return this.http.put(`http://localhost:8080/user/update`, form);
  }

  // Aquarium API routes
  public getAllAquariumsByPage(pageNumber: number): Observable<any> {
    return this.http.get(`http://localhost:8080/aqua/${pageNumber}`);
  }

  public getAquariumById(aquaId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/aqua/id/${aquaId}`);
  }

  public getAquariumByName(name: string): Observable<any> {
    return this.http.get(`http://localhost:8080/aqua/name/${name}`);
  }

  public getAquariumByCity(city: string): Observable<any> {
    return this.http.get(`http://localhost:8080/aqua/city/${city}`);
  }

  public addAquarium(form: any): Observable<any> {
    console.log(`created an Aquarium`);
    return this.http.post(`http://localhost:8080/aqua/create/${this.ss.get('jwt')}`,form);
  }

  //Review API Routes
  public getReviewByAquaId(aquaId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/review/${aquaId}`);
  }

  public postReview(form: string): Observable<any> {
    return this.http.post(`http://localhost:8080/review/create/`, form, this.userOptions);
  }

  public updateReviewUpvotes(reviewId: number, data: string): Observable<any> {
    return this.http.put(`http://localhost:8080/review/upvotes/${reviewId}`, data, this.userOptions)
  }
 
  public updateReviewDownvotes(reviewId: number, data: string): Observable<any> {
    return this.http.put(`http://localhost:8080/review/downvotes/${reviewId}`, data, this.userOptions)
  }

  //Comment API Routs
  public getCommentsByReviewId(reviewId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/comment/${reviewId}`);
  }
  
  public getCommentsByReplyId(replyId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/comment/reply/${replyId}`);
  }

  public postComment(form: Comment): Observable<any> {
    return this.http.post(`http://localhost:8080/comment/create`, form, this.userOptions);
  }
}
