import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPDocControlDocControlAuthorizationComponent } from './authorization/gap.doc.control.doc.control.authorization'
import { GAPDocControlDocControlLogModule } from './gap-doc-control-doc-control-log.module'
import { GAPDocControlDocControlAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPDocControlDocControlAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPDocControlDocControlLogModule
  ],
  declarations: [
    GAPDocControlDocControlAuthorizationComponent
  ],
  exports: [
    GAPDocControlDocControlAuthorizationComponent
  ]
})

export class GAPDocControlDocControlAuthorizationModule { }
