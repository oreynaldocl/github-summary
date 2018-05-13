import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService, RepositoryService, UtilsService, BASE_API_TOKEN } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: BASE_API_TOKEN, useValue: 'https://api.github.com' },
    UserService,
    RepositoryService,
    UtilsService,
  ],
  declarations: [],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
