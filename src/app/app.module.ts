import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponent} from './app-routing.module';
import {ApiService} from './services/api-service.service';
import {HttpClientModule} from '@angular/common/http';
import {BoardComponent} from './board/board.component';
import {BoardService} from './services/board-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThreadService} from './services/thread-service';
import {UtilsService} from './services/utils.service';
import { Page404Component } from './page404/page404.component';
import {CommentService} from './services/comment.service';
import {FormatPipe} from './pipe/formatPipe';
import { ThreadComponent } from './thread/thread.component';
import { InfoRulesComponent } from './info-rules/info-rules.component';
import { BlogComponent } from './blog/blog.component';
import { DevBlogComponent } from './dev-blog/dev-blog.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    BoardComponent,
    Page404Component,
    FormatPipe,
    ThreadComponent,
    InfoRulesComponent,
    BlogComponent,
    DevBlogComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    BoardService,
    ThreadService,
    UtilsService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
