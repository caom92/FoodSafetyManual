import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingAgedProductAuthorizationComponent } from './authorization/gmp.packing.aged.product.authorization'
import { GMPPackingAgedProductLogModule } from './gmp-packing-aged-product-log.module'
import { GMPPackingAgedProductAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingAgedProductAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingAgedProductLogModule
  ],
  declarations: [
    GMPPackingAgedProductAuthorizationComponent
  ],
  exports: [
    GMPPackingAgedProductAuthorizationComponent
  ]
})

export class GMPPackingAgedProductAuthorizationModule { }
