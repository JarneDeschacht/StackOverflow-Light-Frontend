import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostDataService } from '../post-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  private user = JSON.parse(localStorage.getItem('currentUser'));
  public uservote = 0;
  public answer: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _dataService: PostDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.answer = this.fb.group({
      body: ['', Validators.required]
    });
    this.route.data.subscribe(item => {
      this.post = item['post'];
      this.setUserVote();
    });
  }
  setUserVote() {
    this.post.votes.forEach(vote => {
      if (vote.user.userId === this.user._userId) {
        this.uservote = vote.voteType === 0 ? 1 : -1;
      }
    });
  }
  upvote() {
    if (this.uservote === -1) {
      this.post.score++;
    }

    if (this.uservote === 1) {
      this._dataService
        .deleteVote(this.user._userId, this.post.postId)
        .subscribe();
    } else {
      this._dataService
        .addVote(this.user._userId, this.post.postId, 0)
        .subscribe();
    }
    this.uservote = this.uservote === 1 ? 0 : 1;
    this.post.score =
      this.uservote === 0 ? this.post.score - 1 : this.post.score + 1;
  }

  downvote() {
    if (this.uservote === 1) {
      this.post.score--;
    }

    if (this.uservote === -1) {
      this._dataService
        .deleteVote(this.user._userId, this.post.postId)
        .subscribe();
    } else {
      this._dataService
        .addVote(this.user._userId, this.post.postId, 1)
        .subscribe();
    }

    this.uservote = this.uservote === -1 ? 0 : -1;
    this.post.score =
      this.uservote === 0 ? this.post.score + 1 : this.post.score - 1;
  }
  submitAnswer() {
    this._dataService
      .addAnswer(this.user._userId, this.post.postId, this.answer.value.body)
      .subscribe(answer => {
        this.post.addAnswer(answer);
      });
  }
}
