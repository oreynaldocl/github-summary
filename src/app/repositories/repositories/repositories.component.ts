import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RepositoryService } from '../../core/services';
import { Repository, Pagination, RepositoryList } from '../../core/models';

@Component({
  selector: 'gs-repositories',
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent implements OnInit {
  userName: string;
  pagination: Pagination;
  repositories: Repository[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private repoServices: RepositoryService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.pagination = { size: 20, page: 1, pageSize: 4, enabled: true };
    this.route.params.subscribe((params: Params) => {
      this.userName = params['name'];
      this.loadRepositories();
    });
  }

  onPaginate() {
    this.loadRepositories();
  }

  private loadRepositories(): void {
    this.loading = true;
    const { userName } = this;
    const page = this.pagination.page;
    this.repoServices.getRepositories(userName, page).subscribe(
      (list: RepositoryList) => {
        this.pagination.size = list.metadata.size;
        this.pagination.enabled = list.metadata.size > this.pagination.pageSize;
        this.repositories = list.repositories;
        this.loading = false;
      }, () => {
        this.loading = false;
      }
    );
  }

}
