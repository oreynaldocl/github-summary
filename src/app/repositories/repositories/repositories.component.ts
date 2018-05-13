import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { RepositoryService } from '../../core/services';
import { Repository, Pagination, RepositoryList } from '../../core/models';

@Component({
  selector: 'gs-repositories',
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  userName: string;
  pagination: Pagination;
  repositories: Repository[];
  loading: boolean;

  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repoServices: RepositoryService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.pagination = { size: 0, page: 1, pageSize: 4, enabled: false };
    this.route.params.subscribe((params: Params) => {
      this.userName = params['name'];
      if (this.userName) {
        this.subscribeQueryParams();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onPaginate() {
    const page = this.pagination.page;
    this.router.navigate(['../', this.userName], {
      queryParams: { page },
      relativeTo: this.route,
    });
  }

  private loadRepositories(): void {
    this.loading = true;
    const { userName } = this;
    const page = this.pagination.page;
    this.repoServices.getRepositories(userName, page).subscribe(
      (list: RepositoryList) => {
        if (list.metadata.size > 0) {
          this.pagination.size = list.metadata.size;
          this.pagination.enabled = list.metadata.size > this.pagination.pageSize;
        }
        this.repositories = list.repositories;
        this.loading = false;
      }, () => {
        this.loading = false;
      }
    );
  }

  private subscribeQueryParams(): void {
    this.route.queryParams.pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe((params: any) => {
      if (+params['page'] > 0) {
        this.pagination.page = +params['page'];
      }
      this.loadRepositories();
    });
  }

}
