import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BoardService} from '../services/board-service';
import {Board, Boards, PaginateThread, RequestComment, RequestThread, ResponseAllComments} from '../types/types';
import {ThreadService} from '../services/thread-service';
import {environment} from '../../environments/environment';
import {UtilsService} from '../services/utils.service';
import {ApiService} from '../services/api-service.service';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private slugParam: string;
  private readonly page: string;
  hostUrl: string = environment.baseUrl;
  boardData: Board;
  boards: Boards[];
  shortFall = 8000;
  shortFallComment = 8000;
  isLoadComment = false;
  isLoad = false;
  file;
  responseId: string;

  threads: PaginateThread;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    public threadService: ThreadService,
    private apiService: ApiService,
    public utils: UtilsService,
    private router: Router,
    public commentService: CommentService,
  ) {
    this.slugParam = this.route.snapshot.params.slug;
    this.page = this.route.snapshot.params.page || '1';
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.boardService.getBoardsBySlug(this.slugParam).subscribe((data: any) => {
      this.boardData = data.board;
      if (!this.boardData) {
        return this.router.navigate(['404']);
      }

      this.boardService.getThreadsPaginate(this.page, this.boardData._id).subscribe((threads: PaginateThread) => {
        this.threads = threads;
      });
    });

    this.apiService.getBoards().subscribe((data: any) => {
      this.boards = data.boards;
    });
  }

  submit() {
    if (this.threadService.schema.invalid) {
      // TODO: enviar a la pagina de mensaje
      console.log('es invalido!!');
      return;
    }
    this.isLoad = true;
    const data: RequestThread = this.threadService.schema.getRawValue();
    if (!data.option) { delete data.option; }
    data.board = this.boardData._id;

    this.threadService.putThread(data).subscribe((dataResp: any) => {
      // TODO: hacer un mensaje de enviado!!
      this.threadService.schema.reset();
      this.shortFall = 8000;
      this.isLoad = false;
    });
  }

  submitComment() {
    this.commentService.schema.get('thread').setValue(this.responseId);
    if (this.commentService.schema.invalid) {
      // TODO: enviar a la pagina de mensaje
      console.log('es invalido!!');
      return;
    }
    this.isLoadComment = true;
    const data: RequestComment = this.commentService.schema.getRawValue();
    this.commentService.putComment(data).subscribe((dataResp: any) => {
      this.commentService.schema.reset();
      this.shortFallComment = 8000;
      this.isLoadComment = false;
    });
  }

  getShortfall(post: string, comment: boolean = false) {
    if (comment) {
      this.shortFallComment = this.utils.getShortfall(post, 8000);
      return;
    }
    this.shortFall = this.utils.getShortfall(post, 8000);
  }

  fileChanged(event, comment: boolean = false) {
    if (comment) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.commentService.schema.get('file').setValue(file);
        return;
      }
      this.threadService.schema.get('file').setValue(null);
      return;
    }
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.threadService.schema.get('file').setValue(file);
      return;
    }
    this.threadService.schema.get('file').setValue(null);
  }

  showResponseForm(target, id: string, idThread: string) {
    if (!this.responseId) {
      this.responseId = idThread;
    }
    target.style.visibility = 'visible';
    const dataComment: string = this.commentService.schema.get('comment').value;
    this.commentService.schema.get('comment').setValue(this.utils.pushData(dataComment ? dataComment : '', `>>${id}\n`, 0, 0));
  }

  hiddenResponseForm(target) {
    this.responseId = '';
    target.style.visibility = 'hidden';
    this.commentService.schema.reset();
  }

  getAllComments(id: string, index: number) {
    if (this.threads.docs[index].countComment <= 3) {
      return;
    }

    this.commentService.getAllComments(id).subscribe((allComments: ResponseAllComments) => {
      this.threads.docs[index].comments = allComments.comments;
    });
  }

  pushData(text: string, selectionStart: number, selectionEnd: number, comment: boolean = false) {
    if (comment) {
      const dataComment: string = this.commentService.schema.get('comment').value;
      this.commentService.schema.get('comment').setValue(this.utils.pushData(
        dataComment ? dataComment : '',
        text,
        selectionStart,
        selectionEnd
      ));
      this.getShortfall(this.commentService.schema.get('comment').value);
      return;
    }
    const data: string = this.threadService.schema.get('comment').value;
    this.threadService.schema.get('comment').setValue(this.utils.pushData(data ? data : '', text, selectionStart, selectionEnd));
    this.getShortfall(this.threadService.schema.get('comment').value);
  }
}
