import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingScissorsKnivesLogModule } from '../../logs/gmp-packing-scissors-knives/gmp-packing-scissors-knives-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingScissorsKnivesReportModule } from '../../reports/gmp-packing-scissors-knives/gmp-packing-scissors-knives.module'
import { GMPPackingScissorsKnivesCaptureComponent } from './capture/gmp-packing-scissors-knives-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-scissors-knives-log', url: '/log/gmp-packing-scissors-knives', component: GMPPackingScissorsKnivesCaptureComponent, data: { suffix: 'gmp-packing-scissors-knives' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingScissorsKnivesLogModule,
    GMPPackingScissorsKnivesReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScissorsKnivesCaptureComponent
  ]
})

export class GMPPackingScissorsKnivesCaptureModule { }