import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingFinishedProductAuthorizationComponent } from './authorization/gmp.packing.finished.product.authorization'
import { GMPPackingFinishedProductLogModule } from './gmp-packing-finished-product-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-finished-product-authorization', url: '/authorizations/gmp-packing-finished-product/:report_id', component: GMPPackingFinishedProductAuthorizationComponent, data: { suffix: 'gmp-packing-finished-product' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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