import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingFinishedProductAuthorizationComponent } from './authorization/gmp.packing.finished.product.authorization'
import { GMPPackingFinishedProductLogModule } from './gmp-packing-finished-product-log.module'
import { GMPPackingFinishedProductAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingFinishedProductAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingFinishedProductLogModule
  ],
  declarations: [
    GMPPackingFinishedProductAuthorizationComponent
  ],
  exports: [
    GMPPackingFinishedProductAuthorizationComponent
  ]
})

export class GMPPackingFinishedProductAuthorizationModule { }
