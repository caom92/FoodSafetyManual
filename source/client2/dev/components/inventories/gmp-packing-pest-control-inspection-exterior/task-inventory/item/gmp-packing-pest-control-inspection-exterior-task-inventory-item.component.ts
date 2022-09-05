import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPestControlInspectionExteriorTaskInventoryService } from '../services/gmp-packing-pest-control-inspection-exterior-task-inventory.service'
import { SuperInventoryItemComponent } from '../../../super-inventory/super.inventory.item'
import { InventoryTask } from '../interfaces/gmp-packing-pest-control-inspection-exterior-task-inventory.interface'

@Component({
  selector: '[gmp-packing-pest-control-inspection-exterior-task-inventory-item]',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-task-inventory-item.component.html'
})

export class GMPPackingPestControlInspectionExteriorTaskInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Language() lang: string
  @Input() item: InventoryTask

  constructor(inventoryService: GMPPackingPestControlInspectionExteriorTaskInventoryService) {
    super(inventoryService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    this.setToggleValue(this.item.is_active == 1)
  }
}