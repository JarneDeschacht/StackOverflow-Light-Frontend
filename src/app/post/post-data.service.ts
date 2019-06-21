import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { environment } from 'src/environments/environment.prod';

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
}
