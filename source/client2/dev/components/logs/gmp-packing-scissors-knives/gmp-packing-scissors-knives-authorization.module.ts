import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingScissorsKnivesAuthorizationComponent } from './authorization/gmp.packing.scissors.knives.authorization'
import { GMPPackingScissorsKnivesLogModule } from './gmp-packing-scissors-knives-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-scissors-knives-authorization', url: '/authorizations/gmp-packing-scissors-knives/:report_id', component: GMPPackingScissorsKnivesAuthorizationComponent, data: { suffix: 'gmp-packing-scissors-knives' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    CommonModule,
    LogCommonModule,
    GMPPackingScissorsKnivesLogModule
  ],
  declarations: [
    GMPPackingScissorsKnivesAuthorizationComponent
  ],
  exports: [
    GMPPackingScissorsKnivesAuthorizationComponent
  ]
})

export class GMPPackingScissorsKnivesAuthorizationModule { }