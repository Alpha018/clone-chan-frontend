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
      this.boards.sort((a: Boards, b: Boards) => {
        if (a._id > b._id) {
          return 1;
        }
        if (b._id > a._id) {
          return -1;
        }
        console.log(a);
        return 0;
      });
    });
    this.apiService.getStats().subscribe((data: any) => {
      this.stats = data;
    });
    this.apiService.getLatestPost().subscribe((data: any) => {
      this.latestPosts = data.threads;
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
