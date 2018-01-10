import { Component, Input, OnInit } from '@angular/core'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'
import { SuperInventoryItemComponent } from '../../super-inventory/super.inventory.item'
import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que controla un elemento de inventario de GMP Packing Scale
 * Calibration
 * 
 * @export
 * @class GMPSelfInspectionPestControlInventoryItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-item',
  templateUrl: './gmp.self.inspection.pest.control.inventory.item.html'
})

export class GMPSelfInspectionPestControlInventoryItemComponent extends SuperInventoryItemComponent implements OnInit {
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
   * @memberof GMPSelfInspectionPestControlInventoryItemComponent
   */

  public ngOnInit(): void {
    this.setSuffix("gmp-self-inspection-pest-control")
    this.setToggleValue(this.item.is_active == 1)
  }
}