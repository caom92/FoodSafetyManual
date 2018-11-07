import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingOzoneWaterItemComponent } from './item/gmp.packing.ozone.water.item'
import { GMPPackingOzoneWaterLogComponent } from './log/gmp.packing.ozone.water.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-ozone-water-capture', url: '/capture/gmp-packing-ozone-water', component: GMPPackingOzoneWaterLogComponent, data: { suffix: 'gmp-packing-ozone-water' } }

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
    GMPPackingOzoneWaterLogComponent,
    GMPPackingOzoneWaterItemComponent
  ],
  exports: [
    GMPPackingOzoneWaterLogComponent,
    GMPPackingOzoneWaterItemComponent
  ]
})

export class GMPPackingOzoneWaterLogModule { }