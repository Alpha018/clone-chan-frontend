import {FormControl, Validators} from '@angular/forms';
export interface RequestThread {
  comment: string;
  option: string;
  title: string;
  board: string;
  file: string;
}

export interface RequestComment {
  comment: string;
  option: string;
  thread: string;
  file: string;
}

export interface ResponseAllComments {
  comments: Comment[];
}

export interface Boards {
  _id: string;
  board: Board[];
}

export interface Board {
  _id: string;
  icon: string;
  name: string;
  nsfw: boolean;
  slug: string;
  category: string;
  subMessage: string;
}

export interface Stats {
  posts: number;
  online: number;
  users: number;
}

export interface LatestPost {
  _id: string;
  comment: string;
  option: string;
  title: string;
  boardId: Board;
  file: File;
  created_at: Date;
  threadId: number;
}

export interface RandomImages {
  _id: string;
  nameFile: string;
  key: string;
}

export interface Thread {
  _id: string;
  comment: string;
  option: string;
  title: string;
  boardId: Board;
  file: File;
  created_at: Date;
  threadId: number;
  comments: Comment[];
  countComment: number;
  countImage: number;
  countVideo: number;
}

export interface File {
  _id: string;
  nameFile: string;
  type: string;
  key: string;
  fileId: number;
  nameFileOriginal: string;
  mimeType: string;
  size: string;
  dimension?: string;
}

export interface Comment {
  _id: string;
  option: string;
  comment: string;
  file: File;
  commentId: number;
  created_at: Date;
}

export interface PaginateThread {
  docs: Thread[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
  pagingCounter: number;
  prevPage: any;
  nextPage: any;
}
