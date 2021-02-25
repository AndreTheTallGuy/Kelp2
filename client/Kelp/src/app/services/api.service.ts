import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private requestHeaders: any;

  constructor(private http: HttpClient) {}

  public setHeaders(authToken?: string) {
    this.requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${authToken}`,
    });
  }

  // User Api routes
  public getUserbyEmail(email: string, token: any): Observable<any> {
    this.setHeaders(token);
    return this.http.get(`http://localhost:8080/user/email/${email}`, {
      headers: this.requestHeaders,
    });
  }

  public createUser(form: User, token: any): Observable<any> {
    this.setHeaders(token);
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
    console.log('created an Aquarium');
    return this.http.post(`http://localhost:8080/aqua/create`, form);
  }

  //Review API Routes
  public getReviewByAquaId(aquaId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/review/${aquaId}`);
  }

  public postReview(form: string): Observable<any> {
    this.setHeaders();
    return this.http.post(`http://localhost:8080/review/create`, form, {
      headers: this.requestHeaders,
    });
  }

  //Comment API Routs
  public getCommentsByReviewId(reviewId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/comment/${reviewId}`);
  }
  
  public getCommentsByReplyId(replyId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/comment/reply/${replyId}`);
  }

  public postComment(form: string): Observable<any> {
    this.setHeaders();
    return this.http.post(`http://localhost:8080/comment/create`, form,{ headers: this.requestHeaders} );
  }
}
