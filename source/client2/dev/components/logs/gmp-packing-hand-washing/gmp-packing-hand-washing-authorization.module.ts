import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingHandWashingAuthorizationComponent } from './authorization/gmp.packing.hand.washing.authorization'
import { GMPPackingHandWashingLogModule } from './gmp-packing-hand-washing-log.module'
import { GMPPackingHandWashingAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingHandWashingAuthorizationRoutingModule,
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
