import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPDocControlDocControlAuthorizationComponent } from './authorization/gmp.doc.control.doc.control.authorization'
import { GMPDocControlDocControlLogModule } from './gmp-doc-control-doc-control-log.module'
import { GMPDocControlDocControlAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPDocControlDocControlAuthorizationRoutingModule,
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
