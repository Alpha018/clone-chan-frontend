import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Schema } from './schema';

export class Thread extends Schema {
  comment: string;
  option: string;
  title: string;
  board: string;
  file: string;

  static init() {
    return new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.maxLength(8000)]),
      option: new FormControl(),
      title: new FormControl('', [Validators.required]),
      board: new FormControl(),
      file: new FormControl('', [Validators.required]),
    });
  }
}

