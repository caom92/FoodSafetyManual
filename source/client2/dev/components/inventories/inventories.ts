import { Component, ComponentFactoryResolver, OnInit } from '@angular/core'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'

import { BackendService } from '../../services/app.backend'
import { DynamicComponentResolver } from '../dynamic.resolver'
import { GAPPackingPreopInventoryManagerComponent } from './gap-packing-preop/manager/gap.packing.preop.inventory.manager'
import { GMPDocControlDocControlInventoryComponent } from './gmp-doc-control-doc-control/inventory/gmp.doc.control.doc.control.inventory'
import { GMPPackingColdRoomTempInventoryComponent } from './gmp-packing-cold-room-temp/inventory/gmp.packing.cold.room.temp.inventory'
import { GMPPackingGlassBrittleInventoryManagerComponent } from './gmp-packing-glass-brittle/manager/gmp.packing.glass.brittle.inventory.manager'
import { GMPPackingHandWashingInventoryComponent } from './gmp-packing-hand-washing/inventory/gmp.packing.hand.washing.inventory'
import { GMPPackingOzoneWaterInventoryManagerComponent } from './gmp-packing-ozone-water/manager/gmp.packing.ozone.water.inventory.manager'
import { GMPPackingPreopInventoryManagerComponent } from './gmp-packing-preop/manager/gmp.packing.preop.inventory.manager'
import { GMPPackingScaleCalibrationInventoryComponent } from './gmp-packing-scale-calibration/inventory/gmp.packing.scale.calibration.inventory'
import { GMPPackingScissorsKnivesInventoryComponent } from './gmp-packing-scissors-knives/inventory/gmp.packing.scissors.knives.inventory'
import { GMPPackingThermoCalibrationInventoryComponent } from './gmp-packing-thermo-calibration/inventory/gmp.packing.thermo.calibration.inventory'
import { GMPSelfInspectionPestControlInventoryManagerComponent } from './gmp-self-inspection-pest-control/manager/gmp.self.inspection.pest.control.inventory.manager'

@Component({
  selector: 'inventories',
  templateUrl: 'inventories.html'
})

export class InventoryLoaderComponent extends DynamicComponentResolver implements OnInit {
  @Language() lang: string
  private loaderComponent: any = null
  private inventorySuffix: string = ''
  private title: string = ''
  private readonly inventoryComponents = {
    'gap-packing-preop': GAPPackingPreopInventoryManagerComponent,
    'gmp-doc-control-doc-control': GMPDocControlDocControlInventoryComponent,
    'gmp-packing-cold-room-temp': GMPPackingColdRoomTempInventoryComponent,
    'gmp-packing-glass-brittle': GMPPackingGlassBrittleInventoryManagerComponent,
    'gmp-packing-hand-washing': GMPPackingHandWashingInventoryComponent,
    'gmp-packing-ozone-water': GMPPackingOzoneWaterInventoryManagerComponent,
    'gmp-packing-preop': GMPPackingPreopInventoryManagerComponent,
    'gmp-packing-scale-calibration': GMPPackingScaleCalibrationInventoryComponent,
    'gmp-packing-scissors-knives': GMPPackingScissorsKnivesInventoryComponent,
    'gmp-packing-thermo-calibration': GMPPackingThermoCalibrationInventoryComponent,
    'gmp-self-inspection-pest-control': GMPSelfInspectionPestControlInventoryManagerComponent
  }

  constructor(factoryResolver: ComponentFactoryResolver, private router: StateService, private server: BackendService) {
    super(factoryResolver)
  }

  public ngOnInit(): void {
    this.inventorySuffix = this.router.params.suffix
    let logManualFormData = new FormData
    logManualFormData.append('log-suffix', this.inventorySuffix)

    this.server.update(
      'get-log-manual-url',
      logManualFormData,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.title = response.data.log_name
          }
        } else {
          this.title = 'Loading...'
        }
      }
    )

    if (this.inventoryComponents[this.inventorySuffix] != undefined && this.inventoryComponents[this.inventorySuffix] != null) {
      this.loaderComponent = this.loadComponent(this.inventoryComponents[this.inventorySuffix], {
        parent: this
      }).instance
    }
  }
}