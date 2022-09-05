import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingPestControlInspectionExteriorLogModule } from '../../logs/gap-packing-pest-control-inspection-exterior/gap-packing-pest-control-inspection-exterior-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingPestControlInspectionExteriorReportModule } from '../../reports/gap-packing-pest-control-inspection-exterior/gap-packing-pest-control-inspection-exterior-report.module'
import { GAPPackingPestControlInspectionExteriorCaptureComponent } from './capture/gap-packing-pest-control-inspection-exterior-capture.component'
import { GAPPackingPestControlInspectionExteriorCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingPestControlInspectionExteriorCaptureRoutingModule,
    GAPPackingPestControlInspectionExteriorLogModule,
    GAPPackingPestControlInspectionExteriorReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionExteriorCaptureComponent
  ]
})

export class GAPPackingPestControlInspectionExteriorCaptureModule { }
