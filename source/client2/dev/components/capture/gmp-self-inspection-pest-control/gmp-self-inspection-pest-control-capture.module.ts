import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPSelfInspectionPestControlLogModule } from '../../logs/gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPSelfInspectionPestControlReportModule } from '../../reports/gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-report.module'
import { GMPSelfInspectionPestControlCaptureComponent } from './capture/gmp-self-inspection-pest-control-capture.component'
import { GMPSelfInspectionPestControlCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPSelfInspectionPestControlCaptureRoutingModule,
    GMPSelfInspectionPestControlLogModule,
    GMPSelfInspectionPestControlReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPSelfInspectionPestControlCaptureComponent
  ]
})

export class GMPSelfInspectionPestControlCaptureModule { }
