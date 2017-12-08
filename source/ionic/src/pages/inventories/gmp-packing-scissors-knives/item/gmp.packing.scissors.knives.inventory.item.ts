import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { Toggle } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'

import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que controla un elemento de inventario de GMP Packing Scissors
 * Knives
 * 
 * @export
 * @class GMPPackingScissorsKnivesInventoryItemComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-scissors-knives-inventory-item',
  templateUrl: './gmp.packing.scissors.knives.inventory.item.html'
})

export class GMPPackingScissorsKnivesInventoryItemComponent implements OnInit {
  @ViewChild('item_toggle') private item_toggle: Toggle
  @Input() private item: InventoryItem
  private toggleError: boolean = false
  private previousValue: boolean = null

  constructor(private inventoryService: InventoryService) {

  }

  /**
   * Asigna el valor activo/inactivo del elemento en el componente Toggle
   * 
   * @memberof GMPPackingScissorsKnivesInventoryItemComponent
   */

  public ngOnInit(): void {
    this.item_toggle.value = this.item.is_active == 1
  }

  /**
   * Activa/desactiva un elemento a través del servicio de inventarios
   * 
   * @memberof GMPPackingScissorsKnivesInventoryItemComponent
   */

  public toggleItem(): void {
    if (this.toggleError) {
      this.item_toggle.value = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = !this.item_toggle.value
      this.inventoryService.toggleItem(this.item, "toggle-gmp-packing-scissors-knives").then(success => {
        
      }, error => {
        this.toggleError = true
        this.toggleItem()
      })
    }
  }
}