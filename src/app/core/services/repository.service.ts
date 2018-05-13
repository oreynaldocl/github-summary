import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Repository, RepositoryList } from '../models';
import { UtilsService } from './utils.service';

@Injectable()
export class RepositoryService {
  baseApi = 'https://api.github.com';
  pageSize = 4;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
  ) { }

  getRepositories(user: string, page = 1): Observable<RepositoryList> {
    const url = `${this.baseApi}/users/${user}/repos?per_page=${this.pageSize}&page=${page}`;
    return this.http.get<RepositoryList>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const repositories = response.body.map(this.mapRepository);
        const last = this.utilsService.getLastPage(response.headers.get('Link'));
        return {
          metadata: {
            size: last * this.pageSize,
          },
          repositories,
        };
      })
    );
  }

  private mapRepository(responseRepository: any): Repository {
    const { html_url, name, description, open_issues, forks } = responseRepository;
    const repository: Repository = {
      repoUrl: html_url,
      name,
      description,
      issues: +open_issues + 0,
      openIssues: +open_issues,
      forks,
    };
    return repository;
  }
}
