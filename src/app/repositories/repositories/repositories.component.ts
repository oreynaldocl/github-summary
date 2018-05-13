import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RepositoryService } from '../../core/services';
import { Repository, Pagination } from '../../core/models';

@Component({
  selector: 'gs-repositories',
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent implements OnInit {
  userName: string;
  pagination: Pagination;
  repositories: Repository[];

  constructor(
    private route: ActivatedRoute,
    private repoServices: RepositoryService,
  ) { }

  ngOnInit() {
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
    const { userName } = this;
    const page = this.pagination.page;
    this.repoServices.getRepositories(userName, page).subscribe(
      (repositories: Repository[]) => {
        this.repositories = repositories;
      }
    );
  }

}
