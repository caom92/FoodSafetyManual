import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingScaleCalibrationAddItemComponent } from './add-item/gmp.packing.scale.calibration.add.item'
import { GMPPackingScaleCalibrationInventoryComponent } from './inventory/gmp.packing.scale.calibration.inventory'
import { GMPPackingScaleCalibrationInventoryItemComponent } from './item/gmp.packing.scale.calibration.inventory.item'
import { GMPPackingScaleCalibrationInventoryListComponent } from './list/gmp.packing.scale.calibration.inventory.list'
import { GMPPackingScaleCalibrationInventoryViewerComponent } from './viewer/gmp.packing.scale.calibration.inventory.viewer.component'

const inventoryState: Ng2StateDeclaration = { name: 'gmp-packing-scale-calibration-inventory', url: '/inventory/gmp-packing-scale-calibration', component: GMPPackingScaleCalibrationInventoryViewerComponent, data: { suffix: 'gmp-packing-scale-calibration' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    UIRouterModule.forChild({ states: [inventoryState] }),
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
