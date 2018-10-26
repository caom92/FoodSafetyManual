import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingThermoCalibrationAddItemComponent } from './add-item/gmp.packing.thermo.calibration.add.item'
import { GMPPackingThermoCalibrationInventoryComponent } from './inventory/gmp.packing.thermo.calibration.inventory'
import { GMPPackingThermoCalibrationInventoryItemComponent } from './item/gmp.packing.thermo.calibration.inventory.item'
import { GMPPackingThermoCalibrationInventoryListComponent } from './list/gmp.packing.thermo.calibration.inventory.list'
import { GMPPackingThermoCalibrationInventoryViewerComponent } from './viewer/gmp.packing.thermo.calibration.inventory.viewer.component'

const inventoryState: Ng2StateDeclaration = { name: 'gmp-packing-thermo-calibration-inventory', url: '/inventory/gmp-packing-thermo-calibration', component: GMPPackingThermoCalibrationInventoryViewerComponent, data: { suffix: 'gmp-packing-thermo-calibration' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    UIRouterModule.forChild({ states: [ inventoryState ] }),
    CommonModule
  ],
  declarations: [
    GMPPackingThermoCalibrationInventoryComponent,
    GMPPackingThermoCalibrationInventoryItemComponent,
    GMPPackingThermoCalibrationInventoryListComponent,
    GMPPackingThermoCalibrationAddItemComponent,
    GMPPackingThermoCalibrationInventoryViewerComponent
  ]
})

export class GMPPackingThermoCalibrationInventoryModule { }
