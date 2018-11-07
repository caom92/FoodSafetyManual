import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPDocControlDocControlAuthorizationComponent } from './authorization/gmp.doc.control.doc.control.authorization'
import { GMPDocControlDocControlLogModule } from './gmp-doc-control-doc-control-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-doc-control-doc-control-authorization', url: '/authorizations/gmp-doc-control-doc-control/:report_id', component: GMPDocControlDocControlAuthorizationComponent, data: { suffix: 'gmp-doc-control-doc-control' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    CommonModule,
    LogCommonModule,
    GMPDocControlDocControlLogModule
  ],
  declarations: [
    GMPDocControlDocControlAuthorizationComponent
  ],
  exports: [
    GMPDocControlDocControlAuthorizationComponent
  ]
})

export class GMPDocControlDocControlAuthorizationModule { }