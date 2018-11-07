import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingFinishedProductLogComponent } from './log/gmp.packing.finished.product.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-finished-product-capture', url: '/capture/gmp-packing-finished-product', component: GMPPackingFinishedProductLogComponent, data: { suffix: 'gmp-packing-finished-product' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingFinishedProductLogComponent
  ],
  exports: [
    GMPPackingFinishedProductLogComponent
  ]
})

export class GMPPackingFinishedProductLogModule { }