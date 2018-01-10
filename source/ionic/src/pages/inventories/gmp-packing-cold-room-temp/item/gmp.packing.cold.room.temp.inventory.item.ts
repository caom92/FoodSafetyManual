import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.packing.cold.room.temp.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que controla un elemento de inventario de GMP Packing Scale
 * Calibration
 * 
 * @export
 * @class GMPPackingColdRoomTempInventoryItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-cold-room-temp-inventory-item',
  templateUrl: './gmp.packing.cold.room.temp.inventory.item.html'
})

export class GMPPackingColdRoomTempInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
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
   * @memberof GMPPackingColdRoomTempInventoryItemComponent
   */

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-cold-room-temp")
    this.setToggleValue(this.item.is_active == 1)
  }
}