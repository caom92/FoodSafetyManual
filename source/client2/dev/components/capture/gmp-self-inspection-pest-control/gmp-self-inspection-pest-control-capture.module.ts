import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPSelfInspectionPestControlLogModule } from '../../logs/gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPSelfInspectionPestControlReportModule } from '../../reports/gmp-self-inspection-pest-control/gmp-self-inspection-pest-control.module'
import { GMPSelfInspectionPestControlCaptureComponent } from './capture/gmp-self-inspection-pest-control-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-self-inspection-pest-control-log', url: '/log/gmp-self-inspection-pest-control', component: GMPSelfInspectionPestControlCaptureComponent, data: { suffix: 'gmp-self-inspection-pest-control' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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