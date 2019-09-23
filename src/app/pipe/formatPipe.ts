import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({name: 'formatPipe'})
export class FormatPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(text: string): SafeHtml {
    let data = text;
    data = this.replaceGreenText(data);
    data = this.replaceStrikethroughText(data);
    data = this.replaceBoldText(data);
    data = this.replaceCursiveText(data);
    data = this.replaceUnderscoredText(data);
    data = this.replaceRedText(data);
    data = data.replace(/\n/g, '<br/>');

    return this.domSanitizer.bypassSecurityTrustHtml(data);
  }

  replaceUnderscoredText(data: string) {
    const index = this.searchIndexFromRegexp(data, /__.+__/g);
    data = data.replace(/__/gi, '');
    let counter = 0;
    index.forEach((startEnd) => {
      data = [data.slice(0, startEnd.start + counter), '<u>', data.slice(startEnd.start + counter)].join('');
      data = [data.slice(0, startEnd.end + counter), '</u>', data.slice(startEnd.end + counter)].join('');
      counter = counter + 2;
    });
    return data;
  }

  replaceCursiveText(data: string) {
    const index = this.searchIndexFromRegexp(data, /''.+''/g);
    data = data.replace(/''/gi, '');
    let counter = 0;
    index.forEach((startEnd) => {
      data = [data.slice(0, startEnd.start + counter), '<i>', data.slice(startEnd.start + counter)].join('');
      data = [data.slice(0, startEnd.end + counter), '</i>', data.slice(startEnd.end + counter)].join('');
      counter = counter + 2;
    });
    return data;
  }

  replaceBoldText(data: string) {
    const index = this.searchIndexFromRegexp(data, /'''.+'''/g);
    data = data.replace(/'''/gi, '');
    let counter = 0;
    index.forEach((startEnd) => {
      data = [data.slice(0, startEnd.start + counter), '<strong>', data.slice(startEnd.start + counter)].join('');
      counter = counter + 3;
      data = [data.slice(0, startEnd.end + counter), '</strong>', data.slice(startEnd.end + counter)].join('');
      counter = counter + 5;
    });
    return data;
  }

  replaceStrikethroughText(data: string) {
    const index = this.searchIndexFromRegexp(data, /~~.+~~/g);
    data = data.replace(/~~/gi, '');
    let counter = 0;
    index.forEach((startEnd) => {
      data = [data.slice(0, startEnd.start + counter), '<strike>', data.slice(startEnd.start + counter)].join('');
      counter = counter + 5;
      data = [data.slice(0, startEnd.end + counter), '</strike>', data.slice(startEnd.end + counter)].join('');
      counter = counter + 8;
    });
    return data;
  }

  replaceGreenText(data: string) {
    const index = this.searchIndexFromRegexp(data, /[>]{1}[^\d>\\][^\n\\]+/g);
    let counter = 0;
    index.forEach((startEnd) => {
      data = [data.slice(0, startEnd.start + counter), '<span style="color: #1A7D24">', data.slice(startEnd.start + counter)].join('');
      counter = counter + 30;
      data = [data.slice(0, startEnd.end + counter), '</span>', data.slice(startEnd.end + counter)].join('');
      counter = counter + 6;
    });
    return data;
  }

  replaceRedText(data: string) {
    const index = this.searchIndexFromRegexp(data, /[>]{2}\d+/g);
    let counter = 0;
    index.forEach((startEnd) => {
      data = [data.slice(0, startEnd.start + counter), '<span style="color: #E60000">', data.slice(startEnd.start + counter)].join('');
      counter = counter + 30;
      data = [data.slice(0, startEnd.end + counter), '</span>', data.slice(startEnd.end + counter)].join('');
      counter = counter + 6;
    });
    return data;
  }

  searchIndexFromRegexp(data: string, regexp: RegExp) {
    let match;
    const result = [];
    // tslint:disable-next-line:no-conditional-assignment
    while (match = regexp.exec(data)) {
      result.push({
        start: (regexp.lastIndex - match[0].length),
        end: (regexp.lastIndex - 1)
      });
    }
    return result;
  }
}
