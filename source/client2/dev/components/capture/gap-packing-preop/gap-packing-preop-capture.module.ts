import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingPreopLogModule } from '../../logs/gap-packing-preop/gap-packing-preop-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingPreopReportModule } from '../../reports/gap-packing-preop/gap-packing-preop.module'
import { GAPPackingPreopCaptureComponent } from './capture/gap-packing-preop-capture.component'

const logState: Ng2StateDeclaration = { name: 'gap-packing-preop-log', url: '/log/gap-packing-preop', component: GAPPackingPreopCaptureComponent, data: { suffix: 'gap-packing-preop' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GAPPackingPreopLogModule,
    GAPPackingPreopReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPreopCaptureComponent
  ]
})

export class GAPPackingPreopCaptureModule { }