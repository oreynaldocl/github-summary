import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable()
export class UserService {
  baseApi = 'https://api.github.com';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(since: string): Observable<User[]> {
    const param = !!since ? `&since=${since}` : '';
    const url = `${this.baseApi}/users?per_page=4${param}`;
    return this.http.get<User[]>(url).pipe(
      map((responseBody: any) => {
        return responseBody.map(item => {
          const { login, id, html_url, avatar_url } = item;
          const user: User = {
            userName: login,
            id,
            avatarUrl: avatar_url,
            pageUrl: html_url,
          };
          return user;
        });
      }),
    );
  }

}