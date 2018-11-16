import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingATPTestingAuthorizationComponent } from './authorization/gmp.packing.atp.testing.authorization'
import { GMPPackingATPTestingLogModule } from './gmp-packing-atp-testing-log.module'
import { GMPPackingATPTestingAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingATPTestingAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingATPTestingLogModule
  ],
  declarations: [
    GMPPackingATPTestingAuthorizationComponent
  ],
  exports: [
    GMPPackingATPTestingAuthorizationComponent
  ]
})

export class GMPPackingATPTestingAuthorizationModule { }
