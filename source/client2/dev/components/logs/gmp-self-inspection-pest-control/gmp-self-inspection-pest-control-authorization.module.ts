import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPSelfInspectionPestControlAuthorizationComponent } from './authorization/gmp.self.inspection.pest.control.authorization'
import { GMPSelfInspectionPestControlLogModule } from './gmp-self-inspection-pest-control-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-self-inspection-pest-control-authorization', url: '/authorizations/gmp-self-inspection-pest-control/:report_id', component: GMPSelfInspectionPestControlAuthorizationComponent, data: { suffix: 'gmp-self-inspection-pest-control' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    CommonModule,
    LogCommonModule,
    GMPSelfInspectionPestControlLogModule
  ],
  declarations: [
    GMPSelfInspectionPestControlAuthorizationComponent
  ],
  exports: [
    GMPSelfInspectionPestControlAuthorizationComponent
  ]
})

export class GMPSelfInspectionPestControlAuthorizationModule { }