import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionInteriorTaskInventoryService } from '../services/gap-packing-pest-control-inspection-interior-task-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryTask } from '../interfaces/gap-packing-pest-control-inspection-interior-task-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-interior-task-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-interior-task-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionInteriorTaskInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryTask

  constructor(inventoryService: GAPPackingPestControlInspectionInteriorTaskInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-interior')
    this.setToggleValue(this.item.is_active == 1)
  }
}