import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'gs-repositories',
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent implements OnInit {
  userName: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userName = params['name'];
    });
  }

}
