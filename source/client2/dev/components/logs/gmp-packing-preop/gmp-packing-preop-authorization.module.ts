import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPreopAuthorizationComponent } from './authorization/gmp.packing.preop.authorization'
import { GMPPackingPreopLogModule } from './gmp-packing-preop-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-preop-authorization', url: '/authorizations/gmp-packing-preop/:report_id', component: GMPPackingPreopAuthorizationComponent, data: { suffix: 'gmp-packing-preop' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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