import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingPestControlInspectionInteriorLogModule } from '../../logs/gmp-packing-pest-control-inspection-interior/gmp-packing-pest-control-inspection-interior-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingPestControlInspectionInteriorReportModule } from '../../reports/gmp-packing-pest-control-inspection-interior/gmp-packing-pest-control-inspection-interior-report.module'
import { GMPPackingPestControlInspectionInteriorCaptureComponent } from './capture/gmp-packing-pest-control-inspection-interior-capture.component'
import { GMPPackingPestControlInspectionInteriorCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingPestControlInspectionInteriorCaptureRoutingModule,
    GMPPackingPestControlInspectionInteriorLogModule,
    GMPPackingPestControlInspectionInteriorReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPestControlInspectionInteriorCaptureComponent
  ]
})

export class GMPPackingPestControlInspectionInteriorCaptureModule { }
