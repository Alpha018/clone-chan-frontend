import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Schema } from './schema';

export class Comment extends Schema {
  comment: string;
  option: string;
  thread: string;
  file: string;

  static init() {
    return new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      option: new FormControl(),
      thread: new FormControl('', [Validators.required]),
      file: new FormControl(),
    });
  }
}
