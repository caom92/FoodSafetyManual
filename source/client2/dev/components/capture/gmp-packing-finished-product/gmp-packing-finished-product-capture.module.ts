import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingFinishedProductLogModule } from '../../logs/gmp-packing-finished-product/gmp-packing-finished-product-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingFinishedProductReportModule } from '../../reports/gmp-packing-finished-product/gmp-packing-finished-product-report.module'
import { GMPPackingFinishedProductCaptureComponent } from './capture/gmp-packing-finished-product-capture.component'
import { GMPPackingFinishedProductCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingFinishedProductCaptureRoutingModule,
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
