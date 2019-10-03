import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {BoardComponent} from './board/board.component';
import {Page404Component} from './page404/page404.component';
import {ThreadComponent} from './thread/thread.component';

const routes: Routes = [
  { path: 'board/:slug', component: BoardComponent },
  { path: 'board/:slug/:page', component: BoardComponent },
  { path: 'thread/:id', component: ThreadComponent },
  { path: 'thread/:id/:reference', component: ThreadComponent },
  { path: '', component: IndexComponent },
  { path: '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent = [IndexComponent];
