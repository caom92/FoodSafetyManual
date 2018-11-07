import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingATPTestingLogModule } from '../../logs/gmp-packing-atp-testing/gmp-packing-atp-testing-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingATPTestingReportModule } from '../../reports/gmp-packing-atp-testing/gmp-packing-atp-testing.module'
import { GMPPackingATPTestingCaptureComponent } from './capture/gmp-packing-atp-testing-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-atp-testing-log', url: '/log/gmp-packing-atp-testing', component: GMPPackingATPTestingCaptureComponent, data: { suffix: 'gmp-packing-atp-testing' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingATPTestingLogModule,
    GMPPackingATPTestingReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingATPTestingCaptureComponent
  ]
})

export class GMPPackingATPTestingCaptureModule { }