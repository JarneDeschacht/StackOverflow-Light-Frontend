import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PostResolver } from './post-resolver';
import { PostAnswerComponent } from './post-answer/post-answer.component';

const routes = [
  { path: 'list', component: PostListComponent },
  { path: 'add', component: AddPostComponent },
  {
    path: 'detail/:id',
    component: PostDetailComponent,
    resolve: { post: PostResolver }
  }
];

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    AddPostComponent,
    PostComponent,
    PostAnswerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ]
})
export class PostModule {}
