import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { environment } from 'src/environments/environment';
import { Vote } from './vote.model';
import { Answer } from './answer.model';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get posts$(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/post/`).pipe(
      catchError(error => {
        return of(null);
      }),
      map(
        (list: any[]): Post[] => {
          return list.map(Post.fromJSON);
        }
      )
    );
  }
  getPost$(id): Observable<Post> {
    return this.http
      .get(`${environment.apiUrl}/post/${id}`)
      .pipe(map((post: any): Post => Post.fromJSON(post)));
  }
  addVote(userid: number, postId: number, voteType: number): Observable<Vote> {
    return this.http
      .post(`${environment.apiUrl}/post/${postId}/votes`, { userid, voteType })
      .pipe(map((vote: any): Vote => Vote.fromJSON(vote)));
  }
  deleteVote(userid: number, postId: number): Observable<Post> {
    return this.http
      .post(`${environment.apiUrl}/post/${postId}/deletevotes/${userid}`, {})
      .pipe(map((post: any): Post => Post.fromJSON(post)));
  }
  addAnswer(userid: number, postId: number, body: string){
    return this.http
      .post(`${environment.apiUrl}/post/${postId}/answers`, { body, userid })
      .pipe(map((answer: any): Answer => Answer.fromJSON(answer)));
  }
}
