import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingHandWashingAuthorizationComponent } from './authorization/gmp.packing.hand.washing.authorization'
import { GMPPackingHandWashingLogModule } from './gmp-packing-hand-washing-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-hand-washing-authorization', url: '/authorizations/gmp-packing-hand-washing/:report_id', component: GMPPackingHandWashingAuthorizationComponent, data: { suffix: 'gmp-packing-hand-washing' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    CommonModule,
    LogCommonModule,
    GMPPackingHandWashingLogModule
  ],
  declarations: [
    GMPPackingHandWashingAuthorizationComponent
  ],
  exports: [
    GMPPackingHandWashingAuthorizationComponent
  ]
})

export class GMPPackingHandWashingAuthorizationModule { }