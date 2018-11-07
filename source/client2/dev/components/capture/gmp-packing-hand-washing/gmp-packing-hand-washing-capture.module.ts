import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingHandWashingLogModule } from '../../logs/gmp-packing-hand-washing/gmp-packing-hand-washing-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingHandWashingReportModule } from '../../reports/gmp-packing-hand-washing/gmp-packing-hand-washing.module'
import { GMPPackingHandWashingCaptureComponent } from './capture/gmp-packing-hand-washing-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-hand-washing-log', url: '/log/gmp-packing-hand-washing', component: GMPPackingHandWashingCaptureComponent, data: { suffix: 'gmp-packing-hand-washing' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingHandWashingLogModule,
    GMPPackingHandWashingReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHandWashingCaptureComponent
  ]
})

export class GMPPackingHandWashingCaptureModule { }