import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPreopAreaComponent } from './area/gap.packing.preop.area'
import { GAPPackingPreopItemComponent } from './item/gap.packing.preop.item'
import { GAPPackingPreopLogComponent } from './log/gap.packing.preop.log'
import { GAPPackingPreopTypeComponent } from './type/gap.packing.preop.type'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
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
