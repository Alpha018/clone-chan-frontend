import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService} from '../services/board-service';
import {ThreadService} from '../services/thread-service';
import {ApiService} from '../services/api-service.service';
import {UtilsService} from '../services/utils.service';
import {CommentService} from '../services/comment.service';
import {Boards, RequestComment, Thread} from '../types/types';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['../board/board.component.scss', './thread.component.scss']
})
export class ThreadComponent implements OnInit {

  private readonly idParam: string;
  private reference: string;
  threadData: Thread;
  boards: Boards[];
  hostUrl: string = environment.baseUrl;
  shortFall = 8000;
  isLoad = false;

  constructor(private route: ActivatedRoute,
              private boardService: BoardService,
              public threadService: ThreadService,
              private apiService: ApiService,
              public utils: UtilsService,
              private router: Router,
              public commentService: CommentService) {
    this.idParam = this.route.snapshot.params.id;
    this.reference = this.route.snapshot.params.reference;
  }

  ngOnInit() {
    this.getThread();
    this.apiService.getBoards().subscribe((data: any) => {
      this.boards = data.boards;
    });
  }

  submit() {
    this.commentService.schema.get('thread').setValue(this.idParam);
    if (this.commentService.schema.invalid) {
      // TODO: enviar a la pagina de mensaje
      console.log('es invalido!!');
      return;
    }
    this.isLoad = true;
    const data: RequestComment = this.commentService.schema.getRawValue();
    this.commentService.putComment(data).subscribe(() => {
      this.commentService.schema.reset();
      this.shortFall = 8000;
      this.isLoad = false;
      this.getThread();
      return this.router.navigate([`board/${this.threadData.boardId.slug}`]);
    });
  }

  fileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.commentService.schema.get('file').setValue(file);
      return;
    }
    this.commentService.schema.get('file').setValue(null);
  }

  pushData(text: string, selectionStart: number, selectionEnd: number) {
    const data: string = this.commentService.schema.get('comment').value;
    this.commentService.schema.get('comment').setValue(this.utils.pushData(data ? data : '', text, selectionStart, selectionEnd));
    this.getShortfall(this.commentService.schema.get('comment').value);
  }

  getShortfall(post: string) {
    this.shortFall = this.utils.getShortfall(post, 8000);
  }

  putReplicate(id: string) {
    this.utils.goTop(window);
    const dataComment: string = this.commentService.schema.get('comment').value;
    this.commentService.schema.get('comment').setValue(this.utils.pushData(dataComment ? dataComment : '', `>>${id}\n`, 0, 0));
  }

  getThread() {
    this.threadService.getThreadCommentById(this.idParam).subscribe((data: Thread) => {
      this.threadData = data;
      if (!this.threadData) {
        return this.router.navigate(['404']);
      }
    });
  }
}
