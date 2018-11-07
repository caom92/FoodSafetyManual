import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPDocControlDocControlLogModule } from '../../logs/gmp-doc-control-doc-control/gmp-doc-control-doc-control-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPDocControlDocControlReportModule } from '../../reports/gmp-doc-control-doc-control/gmp-doc-control-doc-control.module'
import { GMPDocControlDocControlCaptureComponent } from './capture/gmp-doc-control-doc-control-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-doc-control-doc-control-log', url: '/log/gmp-doc-control-doc-control', component: GMPDocControlDocControlCaptureComponent, data: { suffix: 'gmp-doc-control-doc-control' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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