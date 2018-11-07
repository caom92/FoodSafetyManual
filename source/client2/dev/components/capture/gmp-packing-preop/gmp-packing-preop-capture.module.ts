import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingPreopLogModule } from '../../logs/gmp-packing-preop/gmp-packing-preop-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingPreopReportModule } from '../../reports/gmp-packing-preop/gmp-packing-preop.module'
import { GMPPackingPreopCaptureComponent } from './capture/gmp-packing-preop-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-preop-log', url: '/log/gmp-packing-preop', component: GMPPackingPreopCaptureComponent, data: { suffix: 'gmp-packing-preop' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingPreopLogModule,
    GMPPackingPreopReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPreopCaptureComponent
  ]
})

export class GMPPackingPreopCaptureModule { }