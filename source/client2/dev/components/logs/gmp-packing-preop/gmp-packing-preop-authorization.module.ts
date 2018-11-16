import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPreopAuthorizationComponent } from './authorization/gmp.packing.preop.authorization'
import { GMPPackingPreopLogModule } from './gmp-packing-preop-log.module'
import { GMPPackingPreopAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingPreopAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingPreopLogModule
  ],
  declarations: [
    GMPPackingPreopAuthorizationComponent
  ],
  exports: [
    GMPPackingPreopAuthorizationComponent
  ]
})

export class GMPPackingPreopAuthorizationModule { }
