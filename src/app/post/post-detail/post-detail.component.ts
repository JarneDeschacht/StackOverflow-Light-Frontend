import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  public post: Post;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(item => (this.post = item['post']));
  }
}
