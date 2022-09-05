import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingPestControlInspectionFlytrapLogModule } from '../../logs/gmp-packing-pest-control-inspection-flytrap/gmp-packing-pest-control-inspection-flytrap-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingPestControlInspectionFlytrapReportModule } from '../../reports/gmp-packing-pest-control-inspection-flytrap/gmp-packing-pest-control-inspection-flytrap-report.module'
import { GMPPackingPestControlInspectionFlytrapCaptureComponent } from './capture/gmp-packing-pest-control-inspection-flytrap-capture.component'
import { GMPPackingPestControlInspectionFlytrapCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingPestControlInspectionFlytrapCaptureRoutingModule,
    GMPPackingPestControlInspectionFlytrapLogModule,
    GMPPackingPestControlInspectionFlytrapReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPestControlInspectionFlytrapCaptureComponent
  ]
})

export class GMPPackingPestControlInspectionFlytrapCaptureModule { }
