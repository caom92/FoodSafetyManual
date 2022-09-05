import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingPestControlInspectionFlytrapLogModule } from '../../logs/gap-packing-pest-control-inspection-flytrap/gap-packing-pest-control-inspection-flytrap-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingPestControlInspectionFlytrapReportModule } from '../../reports/gap-packing-pest-control-inspection-flytrap/gap-packing-pest-control-inspection-flytrap-report.module'
import { GAPPackingPestControlInspectionFlytrapCaptureComponent } from './capture/gap-packing-pest-control-inspection-flytrap-capture.component'
import { GAPPackingPestControlInspectionFlytrapCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingPestControlInspectionFlytrapCaptureRoutingModule,
    GAPPackingPestControlInspectionFlytrapLogModule,
    GAPPackingPestControlInspectionFlytrapReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionFlytrapCaptureComponent
  ]
})

export class GAPPackingPestControlInspectionFlytrapCaptureModule { }
