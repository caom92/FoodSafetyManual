import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingATPLuminometerAuthorizationComponent } from './authorization/gmp.packing.atp.luminometer.authorization'
import { GMPPackingATPLuminometerLogModule } from './gmp-packing-atp-luminometer-log.module'
import { GMPPackingATPLuminometerAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingATPLuminometerAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingATPLuminometerLogModule
  ],
  declarations: [
    GMPPackingATPLuminometerAuthorizationComponent
  ],
  exports: [
    GMPPackingATPLuminometerAuthorizationComponent
  ]
})

export class GMPPackingATPLuminometerAuthorizationModule { }
