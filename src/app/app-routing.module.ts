import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {BoardComponent} from './board/board.component';
import {Page404Component} from './page404/page404.component';

const routes: Routes = [
  { path: 'board/:slug', component: BoardComponent },
  { path: 'board/:slug/:page', component: BoardComponent },
  { path: '', component: IndexComponent },
  { path: '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent = [IndexComponent];
