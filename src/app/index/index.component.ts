import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api-service.service';
import {Boards, LatestPost, RandomImages, Stats} from '../types/types';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  boards: Boards[];
  stats: Stats;
  latestPosts: LatestPost[];
  randomImages: RandomImages[];
  hostUrl: string = environment.baseUrl;
  appName: string = environment.appName;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiService.getBoards().subscribe((data: any) => {
      this.boards = data.boards;
    });
    this.apiService.getStats().subscribe((data: any) => {
      this.stats = data;
    });
    this.apiService.getLatestPost().subscribe((data: any) => {
      this.latestPosts = data.threads;
      console.log(this.latestPosts);
    });
    this.apiService.getRandomImages().subscribe((data: any) => {
      this.randomImages = data.images;
    });
  }

  boardClick(slug: string) {
    return this.router.navigate([`board/${slug}`]);
  }

  externalUrlWindow(url: string) {
    window.open(url, '_blank');
  }
}
