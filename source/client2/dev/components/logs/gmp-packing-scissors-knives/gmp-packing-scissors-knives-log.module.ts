import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingScissorsKnivesItemComponent } from './item/gmp.packing.scissors.knives.item'
import { GMPPackingScissorsKnivesLogComponent } from './log/gmp.packing.scissors.knives.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-scissors-knives-capture', url: '/capture/gmp-packing-scissors-knives', component: GMPPackingScissorsKnivesLogComponent, data: { suffix: 'gmp-packing-scissors-knives' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingScissorsKnivesItemComponent
  ],
  exports: [
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingScissorsKnivesItemComponent
  ]
})

export class GMPPackingScissorsKnivesLogModule { }