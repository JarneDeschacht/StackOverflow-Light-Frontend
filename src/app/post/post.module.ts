import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'list', component: PostListComponent },
  { path: 'add', component: AddPostComponent }
];

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    AddPostComponent,
    PostComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PostModule {}
