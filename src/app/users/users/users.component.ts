import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services';
import { User } from '../../core/models';

@Component({
  selector: 'gs-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  private since: string;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.since = '';
    this.loadMoreUsers();
  }

  async loadMoreUsers() {
    const nextUsers = await this.fetchNextUsers();
    this.users = [...this.users, ...nextUsers];
    const last = this.users[this.users.length - 1];
    this.since = last.id;
  }

  private fetchNextUsers(): Promise<User[]> {
    return new Promise<User[]>(resolve => {
      this.userService.getUsers(this.since).subscribe(
        (users: User[]) => {
          resolve(users);
        }, (error) => {
          console['log'](error);
        }
      );
    });
  }

}
