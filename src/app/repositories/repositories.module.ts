import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RepositoriesComponent } from './repositories/repositories.component';

const ROUTES: Routes = [
  { path: ':name', component: RepositoriesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    NgbModule,
  ],
  declarations: [
    RepositoriesComponent,
  ]
})
export class RepositoriesModule { }
