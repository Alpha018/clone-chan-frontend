import { FormGroup } from '@angular/forms';

export class Schema {
  static init(): FormGroup {
    return new FormGroup({});
  }

  getDateString() {
    return (new Date()).toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\./g, '')
  }
}
