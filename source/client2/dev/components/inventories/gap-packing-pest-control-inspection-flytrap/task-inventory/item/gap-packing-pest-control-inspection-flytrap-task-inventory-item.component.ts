import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPestControlInspectionFlytrapTaskInventoryService } from '../services/gap-packing-pest-control-inspection-flytrap-task-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryTask } from '../interfaces/gap-packing-pest-control-inspection-flytrap-task-inventory.interface'

@Component({
  selector: '[gap-packing-pest-control-inspection-flytrap-task-inventory-item]',
  templateUrl: './gap-packing-pest-control-inspection-flytrap-task-inventory-item.component.html'
})

export class GAPPackingPestControlInspectionFlytrapTaskInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryTask

  constructor(inventoryService: GAPPackingPestControlInspectionFlytrapTaskInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-pest-control-inspection-flytrap')
    this.setToggleValue(this.item.is_active == 1)
  }
}