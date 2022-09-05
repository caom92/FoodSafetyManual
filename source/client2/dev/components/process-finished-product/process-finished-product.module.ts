import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ProcessFinishedProductRoutingModule } from './process-finished-product-routing.module'
import { ProcessFinishedProductAddComponent } from './add/process-finished-product-add.component'
import { ProcessFinishedProductViewComponent } from './view/process-finished-product-view.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ProcessFinishedProductRoutingModule,
    CommonModule
  ],
  declarations: [
    ProcessFinishedProductAddComponent,
    ProcessFinishedProductViewComponent
  ],
  exports: [
    ProcessFinishedProductAddComponent,
    ProcessFinishedProductViewComponent
  ]
})

export class ProcessFinishedProductModule { }
