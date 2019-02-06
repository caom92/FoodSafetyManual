import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPDocControlDocControlLogModule } from '../../logs/gap-doc-control-doc-control/gap-doc-control-doc-control-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPDocControlDocControlReportModule } from '../../reports/gap-doc-control-doc-control/gap-doc-control-doc-control-report.module'
import { GAPDocControlDocControlCaptureComponent } from './capture/gap-doc-control-doc-control-capture.component'
import { GAPDocControlDocControlCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPDocControlDocControlCaptureRoutingModule,
    GAPDocControlDocControlLogModule,
    GAPDocControlDocControlReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPDocControlDocControlCaptureComponent
  ]
})

export class GAPDocControlDocControlCaptureModule { }
