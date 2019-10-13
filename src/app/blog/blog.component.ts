import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  appName: string = environment.appName;

  constructor() { }

  ngOnInit() {
  }

}
