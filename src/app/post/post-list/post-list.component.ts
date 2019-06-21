import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Observable } from 'rxjs';
import { PostDataService } from '../post-data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public posts: Post[];
  private _fetchPosts$: Observable<Post[]> = this._postDataService.posts$;
  public loadingError$ = this._postDataService.loadingError$;

  constructor(private _postDataService: PostDataService) {}

  ngOnInit() {}

  get posts$(): Observable<Post[]> {
    return this._fetchPosts$;
  }
}
