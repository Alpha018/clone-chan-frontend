import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  host = location.host;
  chan = environment.appName;
  url;

  constructor(private router: Router) {
    this.url = router.url;
  }

  ngOnInit() {
  }

}
