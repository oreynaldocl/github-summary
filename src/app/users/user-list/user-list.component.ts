import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../core';

@Component({
  selector: 'gs-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @Input() users: User[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToRepo(userName: string) {
    this.router.navigate(['/repos', userName]);
  }

}
