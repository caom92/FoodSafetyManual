import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingGlassBrittleAuthorizationComponent } from './authorization/gmp.packing.glass.brittle.authorization'
import { GMPPackingGlassBrittleLogModule } from './gmp-packing-glass-brittle-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-glass-brittle-authorization', url: '/authorizations/gmp-packing-glass-brittle/:report_id', component: GMPPackingGlassBrittleAuthorizationComponent, data: { suffix: 'gmp-packing-glass-brittle' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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