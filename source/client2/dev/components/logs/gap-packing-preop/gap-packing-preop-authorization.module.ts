import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPreopAuthorizationComponent } from './authorization/gap.packing.preop.authorization'
import { GAPPackingPreopLogModule } from './gap-packing-preop-log.module'

const logState: Ng2StateDeclaration = { name: 'gap-packing-preop-authorization', url: '/authorizations/gap-packing-preop/:report_id', component: GAPPackingPreopAuthorizationComponent, data: { suffix: 'gap-packing-preop' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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