import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingMasterSanitationLogList } from './log-list/gap-packing-master-sanitation-log-list.component'
import { GAPPackingMasterSanitationLogComponent } from './log/gap-packing-master-sanitation-log.component'
import { GAPPackingMasterSanitationItemComponent } from './item/gap-packing-master-sanitation-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingMasterSanitationLogComponent,
    GAPPackingMasterSanitationItemComponent,
    GAPPackingMasterSanitationLogList
  ],
  exports: [
    GAPPackingMasterSanitationLogComponent,
    GAPPackingMasterSanitationItemComponent,
    GAPPackingMasterSanitationLogList
  ]
})

export class GAPPackingMasterSanitationLogModule { }
