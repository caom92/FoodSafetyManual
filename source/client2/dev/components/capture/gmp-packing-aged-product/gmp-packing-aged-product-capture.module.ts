import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingAgedProductLogModule } from '../../logs/gmp-packing-aged-product/gmp-packing-aged-product-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingAgedProductReportModule } from '../../reports/gmp-packing-aged-product/gmp-packing-aged-product.module'
import { GMPPackingAgedProductCaptureComponent } from './capture/gmp-packing-aged-product-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-aged-product-log', url: '/log/gmp-packing-aged-product', component: GMPPackingAgedProductCaptureComponent, data: { suffix: 'gmp-packing-aged-product' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingAgedProductLogModule,
    GMPPackingAgedProductReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingAgedProductCaptureComponent
  ]
})

export class GMPPackingAgedProductCaptureModule { }