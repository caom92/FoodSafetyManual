import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingAgedProductLogComponent } from './log/gmp.packing.aged.product.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-aged-product-capture', url: '/capture/gmp-packing-aged-product', component: GMPPackingAgedProductLogComponent, data: { suffix: 'gmp-packing-aged-product' } }

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
    GMPPackingAgedProductLogComponent
  ],
  exports: [
    GMPPackingAgedProductLogComponent
  ]
})

export class GMPPackingAgedProductLogModule { }