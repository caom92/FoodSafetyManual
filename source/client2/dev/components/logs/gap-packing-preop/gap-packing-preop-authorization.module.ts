import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPreopAuthorizationComponent } from './authorization/gap.packing.preop.authorization'
import { GAPPackingPreopLogModule } from './gap-packing-preop-log.module'
import { GAPPackingPreopAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingPreopAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingPreopLogModule
  ],
  declarations: [
    GAPPackingPreopAuthorizationComponent
  ],
  exports: [
    GAPPackingPreopAuthorizationComponent
  ]
})

export class GAPPackingPreopAuthorizationModule { }
