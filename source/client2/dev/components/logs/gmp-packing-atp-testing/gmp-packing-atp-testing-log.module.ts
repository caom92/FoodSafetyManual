import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingATPTestingLogComponent } from './log/gmp.packing.atp.testing.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-atp-testing-capture', url: '/capture/gmp-packing-atp-testing', component: GMPPackingATPTestingLogComponent, data: { suffix: 'gmp-packing-atp-testing' } }

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
    GMPPackingATPTestingLogComponent
  ],
  exports: [
    GMPPackingATPTestingLogComponent
  ]
})

export class GMPPackingATPTestingLogModule { }