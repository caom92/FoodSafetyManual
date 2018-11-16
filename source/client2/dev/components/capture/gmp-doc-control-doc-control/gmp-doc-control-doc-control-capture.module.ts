import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPDocControlDocControlLogModule } from '../../logs/gmp-doc-control-doc-control/gmp-doc-control-doc-control-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPDocControlDocControlReportModule } from '../../reports/gmp-doc-control-doc-control/gmp-doc-control-doc-control-report.module'
import { GMPDocControlDocControlCaptureComponent } from './capture/gmp-doc-control-doc-control-capture.component'
import { GMPDocControlDocControlCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPDocControlDocControlCaptureRoutingModule,
    GMPDocControlDocControlLogModule,
    GMPDocControlDocControlReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPDocControlDocControlCaptureComponent
  ]
})

export class GMPDocControlDocControlCaptureModule { }
