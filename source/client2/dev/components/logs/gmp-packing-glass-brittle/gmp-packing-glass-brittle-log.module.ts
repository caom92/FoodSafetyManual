import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingGlassBrittleAreaComponent } from './area/gmp.packing.glass.brittle.area'
import { GMPPackingGlassBrittleItemComponent } from './item/gmp.packing.glass.brittle.item'
import { GMPPackingGlassBrittleLogComponent } from './log/gmp.packing.glass.brittle.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingGlassBrittleLogComponent,
    GMPPackingGlassBrittleAreaComponent,
    GMPPackingGlassBrittleItemComponent
  ],
  exports: [
    GMPPackingGlassBrittleLogComponent,
    GMPPackingGlassBrittleAreaComponent,
    GMPPackingGlassBrittleItemComponent
  ]
})

export class GMPPackingGlassBrittleLogModule { }
