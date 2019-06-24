import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostDataService } from '../post-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('currentUser'));
  public post: FormGroup;

  constructor(
    private _dataService: PostDataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.post = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(80)]],
      body: ['', Validators.required]
    });
  }
  get title() {
    return this.post.get('title');
  }
  get body() {
    return this.post.get('body');
  }
  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.required) {
      return 'This field is required';
    } else if (errors.maxlength) {
      return `Maximum length is ${errors.maxlength.requiredLength} 
        characters (now ${errors.maxlength.actualLength})`;
    }
  }
  onSubmit() {
    this._dataService
      .addPost(this.user._userId, this.post.value.title, this.post.value.body)
      .subscribe(() => this.router.navigateByUrl('/post/list'));
  }
}
