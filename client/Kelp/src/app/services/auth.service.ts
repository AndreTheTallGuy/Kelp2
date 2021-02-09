import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aquarium } from '../models/Aquarium';
import { Review } from '../models/Review';
import { User } from '../models/User';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private requestHeaders = new HttpHeaders();
  

  constructor(
    private http: HttpClient,
    private afa: AngularFireAuth
  ) {}

  public setHeaders() {
    // const authToken = await this.firebaseService.getSyncToken();
    this.requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${authToken}`,
    });
    console.log('setHeaders');
  }
  // User Api routes
  public getUserbyEmail(email: string, token: string): Observable<any> {
    this.afa.idToken.subscribe((res) => {
      token = res!;
      console.log(token);
    })
      console.log(token);
    return this.http.get(`http://localhost:8080/user/email/${email}`);
  }

  public createUser(form: User): Observable<any> {
    this.setHeaders();
    console.log('we got to create user');
    return this.http.post(`http://localhost:8080/user/create`, form, {
      headers: this.requestHeaders,
    });
  }

  public updateProfile(form: User): Observable<any> {
    return this.http.put(`http://localhost:8080/user/update`, form);
  }

  // Aquarium API routes
  public getAllAquariumsByPage(pageNumber: number): Observable<any> {
    return this.http.get(`http://localhost:8080/aqua/${pageNumber}`);
  }

  public getAquariumById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/aqua/id/${id}`);
  }

  public addAquarium(form: any): Observable<any> {
    console.log("created an Aquarium");
    return this.http.post(`http://localhost:8080/aqua/create`, form);
  }

  //Review API Routes
  public getReviewByAquaId(aquaId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/review/${aquaId}`);
  }

  public postReview(form: Review): Observable<any> {
    return this.http.post(`http://localhost:8080/review/create`, form);
  }

  //Comment API Routs
  public getCommentsByReviewId(reviewId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/comment/${reviewId}`);
  }

  public postComment(form: Comment): Observable<any> {
    return this.http.post(`http://localhost:8080/comment/create`, form);
  }
}
