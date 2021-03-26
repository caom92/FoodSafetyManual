import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingHarvestMachineCleaningLogList } from './log-list/gap-packing-harvest-machine-cleaning-log-list.component'
import { GAPPackingHarvestMachineCleaningLogComponent } from './log/gap-packing-harvest-machine-cleaning-log.component'
import { GAPPackingHarvestMachineCleaningMachineComponent } from './machine/gap-packing-harvest-machine-cleaning-machine.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestMachineCleaningLogComponent,
    GAPPackingHarvestMachineCleaningLogList,
    GAPPackingHarvestMachineCleaningMachineComponent
  ],
  exports: [
    GAPPackingHarvestMachineCleaningLogComponent,
    GAPPackingHarvestMachineCleaningLogList,
    GAPPackingHarvestMachineCleaningMachineComponent
  ]
})

export class GAPPackingHarvestMachineCleaningLogModule { }
