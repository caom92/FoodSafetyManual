import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingATPTestingAuthorizationComponent } from './authorization/gmp.packing.atp.testing.authorization'
import { GMPPackingATPTestingLogModule } from './gmp-packing-atp-testing-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-atp-testing-authorization', url: '/authorizations/gmp-packing-atp-testing/:report_id', component: GMPPackingATPTestingAuthorizationComponent, data: { suffix: 'gmp-packing-atp-testing' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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