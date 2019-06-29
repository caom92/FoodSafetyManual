import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingProductRevisionAuthorizationComponent } from './authorization/gmp-packing-product-revision-authorization.component'
import { GMPPackingProductRevisionLogModule } from './gmp-packing-product-revision-log.module'
import { GMPPackingProductRevisionAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingProductRevisionAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingProductRevisionLogModule
  ],
  declarations: [
    GMPPackingProductRevisionAuthorizationComponent
  ],
  exports: [
    GMPPackingProductRevisionAuthorizationComponent
  ]
})

export class GMPPackingProductRevisionAuthorizationModule { }
