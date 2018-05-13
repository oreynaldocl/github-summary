import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService, RepositoryService, UtilsService } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
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
