import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingPestControlInspectionInteriorLogModule } from '../../logs/gap-packing-pest-control-inspection-interior/gap-packing-pest-control-inspection-interior-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingPestControlInspectionInteriorReportModule } from '../../reports/gap-packing-pest-control-inspection-interior/gap-packing-pest-control-inspection-interior-report.module'
import { GAPPackingPestControlInspectionInteriorCaptureComponent } from './capture/gap-packing-pest-control-inspection-interior-capture.component'
import { GAPPackingPestControlInspectionInteriorCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingPestControlInspectionInteriorCaptureRoutingModule,
    GAPPackingPestControlInspectionInteriorLogModule,
    GAPPackingPestControlInspectionInteriorReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionInteriorCaptureComponent
  ]
})

export class GAPPackingPestControlInspectionInteriorCaptureModule { }
