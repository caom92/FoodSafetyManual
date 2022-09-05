import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionExteriorTaskInventoryService } from '../services/gap-packing-pest-control-inspection-exterior-task-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryTask } from '../interfaces/gap-packing-pest-control-inspection-exterior-task-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-exterior-task-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-exterior-task-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionExteriorTaskInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryTask

  constructor(inventoryService: GAPPackingPestControlInspectionExteriorTaskInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}