import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que controla un elemento de inventario de GMP Packing Scale
 * Calibration
 * 
 * @export
 * @class GMPPackingScissorsKnivesInventoryItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-scissors-knives-inventory-item',
  templateUrl: './gmp.packing.scissors.knives.inventory.item.html'
})

export class GMPPackingScissorsKnivesInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
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
   * @memberof GMPPackingScissorsKnivesInventoryItemComponent
   */

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-scissors-knives")
    this.setToggleValue(this.item.is_active == 1)
  }
}