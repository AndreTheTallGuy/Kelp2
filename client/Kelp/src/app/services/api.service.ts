import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root',
})

// .set('Authorization','Bearer ' + this.ss.get('jwt') 
export class ApiService {
  private userOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',`${this.ss.get('jwt')}`) }

  constructor(private http: HttpClient, private ss: LocalStorageService, private af: AngularFireAuth) {
    
  }


  // User Api routes
  public getUserbyEmail(email: string): Observable<any> {
    console.log(email);
    return this.http.get(`https://localhost:8080/user/email/${email}`, this.userOptions);
  }

  public getUserById(id:any): Observable<any> {
    return this.http.get(`https://localhost8080/user/${id}`)

  }

  public createUser(form: User): Observable<any> {
    console.log('we got to create user');
    return this.http.post(`https://localhost:8080/user/create`, form, this.userOptions);
  }

  public updateProfile(form: User): Observable<any> {
    console.log("updating profile");
    return this.http.put(`https://localhost:8080/user/update`, form, this.userOptions);
  }

  // Aquarium API routes
  public getAllAquariumsByPage(pageNumber: number): Observable<any> {
    return this.http.get(`https://localhost:8080/aqua/${pageNumber}`);
  }

  public getAquariumById(aquaId: number): Observable<any> {
    return this.http.get(`https://localhost:8080/aqua/id/${aquaId}`);
  }

  public getAquariumByName(name: string): Observable<any> {
    return this.http.get(`https://localhost:8080/aqua/name/${name}`);
  }

  public getAquariumByCity(city: string): Observable<any> {
    return this.http.get(`https://localhost:8080/aqua/city/${city}`);
  }

  public addAquarium(form: any): Observable<any> {
    console.log(`created an Aquarium`);
    return this.http.post(`https://localhost:8080/aqua/create`,form, this.userOptions);
  }

  //Review API Routes
  public getReviewByAquaId(aquaId: number): Observable<any> {
    return this.http.get(`https://localhost:8080/review/${aquaId}`);
  }

  public postReview(form: string): Observable<any> {
    // this.setHeaders();
    return this.http.post(`https://localhost:8080/review/create`, form, this.userOptions);

  }

  public updateReviewUpvotes(reviewId: number, data: string): Observable<any> {
    return this.http.put(`http://localhost:8080/review/upvotes/${reviewId}`, data, this.userOptions)
  }
 
  public updateReviewDownvotes(reviewId: number, data: string): Observable<any> {
    return this.http.put(`http://localhost:8080/review/downvotes/${reviewId}`, data, this.userOptions)
  }

  //Comment API Routs
  public getCommentsByReviewId(reviewId: number): Observable<any> {
    return this.http.get(`https://localhost:8080/comment/${reviewId}`);
  }
  
  public getCommentsByReplyId(replyId: number): Observable<any> {
    return this.http.get(`https://localhost:8080/comment/reply/${replyId}`);
  }

  public postComment(form: Comment): Observable<any> {
    return this.http.post(`https://localhost:8080/comment/create`, form, this.userOptions);
  }
}
