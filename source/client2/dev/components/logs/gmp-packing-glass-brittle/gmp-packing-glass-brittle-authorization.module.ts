import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingGlassBrittleAuthorizationComponent } from './authorization/gmp.packing.glass.brittle.authorization'
import { GMPPackingGlassBrittleLogModule } from './gmp-packing-glass-brittle-log.module'
import { GMPPackingGlassBrittleAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingGlassBrittleAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingGlassBrittleLogModule
  ],
  declarations: [
    GMPPackingGlassBrittleAuthorizationComponent
  ],
  exports: [
    GMPPackingGlassBrittleAuthorizationComponent
  ]
})

export class GMPPackingGlassBrittleAuthorizationModule { }
