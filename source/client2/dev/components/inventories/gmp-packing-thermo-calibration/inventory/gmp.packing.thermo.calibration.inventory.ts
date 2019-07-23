import { Component, Input } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/inventory.service'
import { SuperInventoryComponent } from '../../super-inventory/super.inventory'
import { InventoryItem } from '../interfaces/gmp.packing.thermo.calibration.inventory.interface'

@Component({
  selector: 'gmp-packing-thermo-calibration-inventory',
  templateUrl: './gmp.packing.thermo.calibration.inventory.html'
})

export class GMPPackingThermoCalibrationInventoryComponent extends SuperInventoryComponent {
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: PubSubService,
    inventoryService: InventoryService,
    dragulaService: DragulaService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-thermo-calibration')
    this.setBagName(this.suffix + '-bag')
    super.ngOnInit()
  }
  
  public onInventoryUpdate(): void {
    // Se debe reimplmentar para evitar que se lance la excepción
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}