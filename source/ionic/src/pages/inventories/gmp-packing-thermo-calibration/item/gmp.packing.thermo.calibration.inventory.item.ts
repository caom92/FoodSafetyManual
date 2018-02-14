import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.packing.thermo.calibration.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

@Component({
  selector: 'gmp-packing-thermo-calibration-inventory-item',
  templateUrl: './gmp.packing.thermo.calibration.inventory.item.html'
})

export class GMPPackingThermoCalibrationInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() item: InventoryItem

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-thermo-calibration")
    this.setToggleValue(this.item.is_active == 1)
  }
}