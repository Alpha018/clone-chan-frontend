import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {BoardComponent} from './board/board.component';
import {Page404Component} from './page404/page404.component';
import {ThreadComponent} from './thread/thread.component';
import {InfoRulesComponent} from './info-rules/info-rules.component';
import {BlogComponent} from './blog/blog.component';
import {DevBlogComponent} from './dev-blog/dev-blog.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  { path: 'board/:slug', component: BoardComponent },
  { path: 'board/:slug/:page', component: BoardComponent },
  { path: 'thread/:id', component: ThreadComponent },
  { path: 'thread/:id/:reference', component: ThreadComponent },
  { path: 'rules', component: InfoRulesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'devblog', component: DevBlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: IndexComponent },
  { path: '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent = [IndexComponent];
