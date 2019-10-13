import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dev-blog',
  templateUrl: './dev-blog.component.html',
  styleUrls: ['./dev-blog.component.scss']
})
export class DevBlogComponent implements OnInit {

  appName: string = environment.appName;

  constructor() { }

  ngOnInit() {
  }

}
