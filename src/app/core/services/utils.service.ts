import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  getLastPage(linksParam: string): number {
    if (!linksParam) {
      return 0;
    }
    const links = linksParam.split(', ');
    const last = links.find(item => item.indexOf('"last"') >= 0);
    if (!last) {
      return 0;
    }
    let [url] = last.split(';');
    url = url.substr(1, url.length - 2);
    const page = this.getQueryParam(url, 'page') || '';
    const [, number] = page.split('=');
    return !!number ? +number : 0;

  }

  getQueryParam(url: string, paramName: string): string {
    const [, query = ''] = url.split('?');
    const param = query.split('&').find(item => item.indexOf(paramName) === 0);
    return param;
  }
}
