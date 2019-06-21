import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { SelectivePreloadStrategy } from './selective-preload-strategy';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'post',
    loadChildren: './post/post.module#PostModule',
    data: { preload: true }
  },
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    data: { preload: true }
  },
  { path: '', redirectTo: 'post/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
