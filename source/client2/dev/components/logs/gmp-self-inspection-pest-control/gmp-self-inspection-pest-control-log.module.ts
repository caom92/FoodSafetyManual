import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPSelfInspectionPestControlAreaComponent } from './area/gmp.self.inspection.pest.control.area'
import { GMPSelfInspectionPestControlItemComponent } from './item/gmp.self.inspection.pest.control.item'
import { GMPSelfInspectionPestControlLogComponent } from './log/gmp.self.inspection.pest.control.log'

const logState: Ng2StateDeclaration = { name: 'gmp-self-inspection-pest-control-capture', url: '/capture/gmp-self-inspection-pest-control', component: GMPSelfInspectionPestControlLogComponent, data: { suffix: 'gmp-self-inspection-pest-control' } }

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
    GMPSelfInspectionPestControlLogComponent,
    GMPSelfInspectionPestControlAreaComponent,
    GMPSelfInspectionPestControlItemComponent
  ],
  exports: [
    GMPSelfInspectionPestControlLogComponent,
    GMPSelfInspectionPestControlAreaComponent,
    GMPSelfInspectionPestControlItemComponent
  ]
})

export class GMPSelfInspectionPestControlLogModule { }