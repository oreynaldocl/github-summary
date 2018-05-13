import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  /**
   * Returns value of last page based on link header.
   * @param {string} linkHeader - Link header of responser header.
   * @returns {number} 0 if page is not found in last link of header.
   */
  getLastPage(linkHeader: string): number {
    if (!linkHeader) {
      return 0;
    }
    const links = linkHeader.split(', ');
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
    if (!url || !paramName) {
      return '';
    }
    const [, query = ''] = url.split('?');
    const param = query.split('&').find(item => item.indexOf(paramName) === 0);
    return param;
  }
}
