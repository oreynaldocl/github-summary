import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Repository } from '../models';

@Injectable()
export class RepositoryService {
  baseApi = 'https://api.github.com';

  constructor(
    private http: HttpClient,
  ) { }

  getRepositories(user: string, page = 1): Observable<Repository[]> {
    const url = `${this.baseApi}/users/${user}/repos?per_page=4&page=${page}`;
    return this.http.get<Repository[]>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response.body.map(item => {
          const { html_url, name, description, open_issues, forks } = item;
          const repository: Repository = {
            repoUrl: html_url,
            name,
            description,
            issues: +open_issues + 0,
            openIssues: +open_issues,
            forks,
          };
          return repository;
        });
      })
    );
  }
}
