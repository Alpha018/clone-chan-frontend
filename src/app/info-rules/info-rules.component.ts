import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-info-rules',
  templateUrl: './info-rules.component.html',
  styleUrls: ['./info-rules.component.scss']
})
export class InfoRulesComponent implements OnInit {

  appName: string = environment.appName;

  constructor() { }

  ngOnInit() {
  }

}
