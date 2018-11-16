import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingScissorsKnivesItemComponent } from './item/gmp.packing.scissors.knives.item'
import { GMPPackingScissorsKnivesLogComponent } from './log/gmp.packing.scissors.knives.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingScissorsKnivesItemComponent
  ],
  exports: [
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingScissorsKnivesItemComponent
  ]
})

export class GMPPackingScissorsKnivesLogModule { }
