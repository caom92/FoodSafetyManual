import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingProductRevisionLogModule } from '../../logs/gmp-packing-product-revision/gmp-packing-product-revision-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingProductRevisionReportModule } from '../../reports/gmp-packing-product-revision/gmp-packing-product-revision-report.module'
import { GMPPackingProductRevisionCaptureComponent } from './capture/gmp-packing-product-revision-capture.component'
import { GMPPackingProductRevisionCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingProductRevisionCaptureRoutingModule,
    GMPPackingProductRevisionLogModule,
    GMPPackingProductRevisionReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingProductRevisionCaptureComponent
  ]
})

export class GMPPackingProductRevisionCaptureModule { }
