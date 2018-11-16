import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingScaleCalibrationAddItemComponent } from './add-item/gmp.packing.scale.calibration.add.item'
import { GMPPackingScaleCalibrationInventoryComponent } from './inventory/gmp.packing.scale.calibration.inventory'
import { GMPPackingScaleCalibrationInventoryItemComponent } from './item/gmp.packing.scale.calibration.inventory.item'
import { GMPPackingScaleCalibrationInventoryListComponent } from './list/gmp.packing.scale.calibration.inventory.list'
import { GMPPackingScaleCalibrationInventoryViewerComponent } from './viewer/gmp.packing.scale.calibration.inventory.viewer.component'
import { GMPPackingScaleCalibrationInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingScaleCalibrationInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScaleCalibrationInventoryComponent,
    GMPPackingScaleCalibrationInventoryItemComponent,
    GMPPackingScaleCalibrationInventoryListComponent,
    GMPPackingScaleCalibrationAddItemComponent,
    GMPPackingScaleCalibrationInventoryViewerComponent
  ]
})

export class GMPPackingScaleCalibrationInventoryModule { }
