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
import { AuthGuardService } from '../authentication/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: 'list',
    component: PostListComponent
  },
  { path: 'add', canActivate: [AuthGuardService], component: AddPostComponent },
  {
    path: 'detail/:id',
    canActivate: [AuthGuardService],
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ]
})
export class PostModule {}
