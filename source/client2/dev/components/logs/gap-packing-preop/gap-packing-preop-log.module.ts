import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPreopAreaComponent } from './area/gap.packing.preop.area'
import { GAPPackingPreopItemComponent } from './item/gap.packing.preop.item'
import { GAPPackingPreopLogComponent } from './log/gap.packing.preop.log'
import { GAPPackingPreopTypeComponent } from './type/gap.packing.preop.type'

const logState: Ng2StateDeclaration = { name: 'gap-packing-preop-capture', url: '/capture/gap-packing-preop', component: GAPPackingPreopLogComponent, data: { suffix: 'gap-packing-preop' } }

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
    GAPPackingPreopLogComponent,
    GAPPackingPreopAreaComponent,
    GAPPackingPreopTypeComponent,
    GAPPackingPreopItemComponent
  ],
  exports: [
    GAPPackingPreopLogComponent,
    GAPPackingPreopAreaComponent,
    GAPPackingPreopTypeComponent,
    GAPPackingPreopItemComponent
  ]
})

export class GAPPackingPreopLogModule { }