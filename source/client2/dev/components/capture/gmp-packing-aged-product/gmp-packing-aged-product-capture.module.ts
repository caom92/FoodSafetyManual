import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingAgedProductLogModule } from '../../logs/gmp-packing-aged-product/gmp-packing-aged-product-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingAgedProductReportModule } from '../../reports/gmp-packing-aged-product/gmp-packing-aged-product-report.module'
import { GMPPackingAgedProductCaptureComponent } from './capture/gmp-packing-aged-product-capture.component'
import { GMPPackingAgedProductCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingAgedProductCaptureRoutingModule,
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
