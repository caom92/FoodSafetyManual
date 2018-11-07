import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingAgedProductAuthorizationComponent } from './authorization/gmp.packing.aged.product.authorization'
import { GMPPackingAgedProductLogModule } from './gmp-packing-aged-product-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-aged-product-authorization', url: '/authorizations/gmp-packing-aged-product/:report_id', component: GMPPackingAgedProductAuthorizationComponent, data: { suffix: 'gmp-packing-aged-product' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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