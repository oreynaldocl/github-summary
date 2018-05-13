import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../core';

@Component({
  selector: 'gs-user-card',
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
