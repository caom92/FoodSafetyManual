import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingFinishedProductLogModule } from '../../logs/gmp-packing-finished-product/gmp-packing-finished-product-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingFinishedProductReportModule } from '../../reports/gmp-packing-finished-product/gmp-packing-finished-product.module'
import { GMPPackingFinishedProductCaptureComponent } from './capture/gmp-packing-finished-product-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-finished-product-log', url: '/log/gmp-packing-finished-product', component: GMPPackingFinishedProductCaptureComponent, data: { suffix: 'gmp-packing-finished-product' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingFinishedProductLogModule,
    GMPPackingFinishedProductReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingFinishedProductCaptureComponent
  ]
})

export class GMPPackingFinishedProductCaptureModule { }