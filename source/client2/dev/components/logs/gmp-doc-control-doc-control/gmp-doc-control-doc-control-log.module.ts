import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPDocControlDocControlLogComponent } from './log/gmp.doc.control.doc.control.log'

const logState: Ng2StateDeclaration = { name: 'gmp-doc-control-doc-control-capture', url: '/capture/gmp-doc-control-doc-control', component: GMPDocControlDocControlLogComponent, data: { suffix: 'gmp-doc-control-doc-control' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPDocControlDocControlLogComponent
  ],
  exports: [
    GMPDocControlDocControlLogComponent
  ]
})

export class GMPDocControlDocControlLogModule { }