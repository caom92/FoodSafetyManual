import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPSelfInspectionPestControlLogModule } from '../../logs/gap-self-inspection-pest-control/gap-self-inspection-pest-control-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPSelfInspectionPestControlReportModule } from '../../reports/gap-self-inspection-pest-control/gap-self-inspection-pest-control-report.module'
import { GAPSelfInspectionPestControlCaptureComponent } from './capture/gap-self-inspection-pest-control-capture.component'
import { GAPSelfInspectionPestControlCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPSelfInspectionPestControlCaptureRoutingModule,
    GAPSelfInspectionPestControlLogModule,
    GAPSelfInspectionPestControlReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPSelfInspectionPestControlCaptureComponent
  ]
})

export class GAPSelfInspectionPestControlCaptureModule { }
