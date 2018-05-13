import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../core';

@Component({
  selector: 'gs-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  @Output() onClickRepo = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  goLocalRepo() {
    this.onClickRepo.emit();
  }

}
