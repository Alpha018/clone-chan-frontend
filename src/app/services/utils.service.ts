import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  HOST_URL: string = environment.baseUrl;

  constructor() { }

  public pushData(originalText: string, text: string, selectionStart: number, selectionEnd: number) {
    const data: string = originalText;
    if (selectionStart !== selectionEnd) {
      const select = data.substring(selectionStart, selectionEnd);
      // tslint:disable-next-line:max-line-length
      return `${data.substring(0, selectionStart)}${this.splice(text, (text.length / 2), 0, select)}${data.substring(selectionEnd, data.length)}`;
    }
    return `${data}${text}`;
  }

  public goTop(window) {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 5);
  }

  public initImage(target) {
    const x = window.matchMedia('(max-width: 720px)');
    if (x.matches) {
      target.style.width = '70%';
      target.style.height = '70%';
      return;
    }
    target.style.width = '20%';
    target.style.height = '20%';
  }

  public resizeImage(target) {
    const x = window.matchMedia('(max-width: 720px)');
    if (target.style.width === '20%' || target.style.width === '70%') {
      target.style.width = '100%';
      target.style.height = '100%';
      return;
    }
    if (x.matches) {
      target.style.width = '70%';
      target.style.height = '70%';
      return;
    }
    target.style.width = '20%';
    target.style.height = '20%';
  }

  public resizeVideo(target) {
    if (!target.hasAttribute('controls')) {
      target.style.width = '100%';
      target.style.height = '100%';
      target.setAttribute('controls', 'controls');
    }
  }

  public splice(text: string, start: number, rem: number, insert: string) {
    return text.slice(0, start) + insert + text.slice(start + Math.abs(rem));
  }

  public getShortfall(text: string, maxLength: number) {
    if ((maxLength - text.length) <= 0) {
      return 0;
    }
    return (maxLength - text.length);
  }
}
