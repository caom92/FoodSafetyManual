import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.packing.hand.washing.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que controla un elemento de inventario de GMP Packing Scale
 * Calibration
 * 
 * @export
 * @class GMPPackingHandWashingInventoryItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-hand-washing-inventory-item',
  templateUrl: './gmp.packing.hand.washing.inventory.item.html'
})

export class GMPPackingHandWashingInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
  @Input() private type: string = ""
  @Input() item: InventoryItem = null

  constructor(inventoryService: InventoryService) {
    super(inventoryService)
  }

  /**
   * Asigna el sufijo de la bitácora, que identifica a los servicios que serán
   * invocados del servidor, así como el valor activo/inactivo del elemento en
   * el componente Toggle
   * 
   * @memberof GMPPackingHandWashingInventoryItemComponent
   */

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-hand-washing")
    this.setToggleValue(this.item.is_active == 1)
  }
}