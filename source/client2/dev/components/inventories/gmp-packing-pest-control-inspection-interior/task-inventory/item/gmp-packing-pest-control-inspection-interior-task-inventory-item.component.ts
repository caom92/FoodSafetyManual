import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionInteriorTaskInventoryService } from '../services/gmp-packing-pest-control-inspection-interior-task-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryTask } from '../interfaces/gmp-packing-pest-control-inspection-interior-task-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-interior-task-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-interior-task-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionInteriorTaskInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryTask

  constructor(inventoryService: GMPPackingPestControlInspectionInteriorTaskInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}