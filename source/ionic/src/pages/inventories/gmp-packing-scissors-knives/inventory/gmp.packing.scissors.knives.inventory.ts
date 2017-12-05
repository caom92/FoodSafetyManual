import { Component, Input, OnInit } from '@angular/core'
import { ModalController, Events, NavController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.scissors.knives.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GMPPackingScissorsKnivesAddItemComponent } from '../add-item/gmp.packing.scissors.knives.add.item'

import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que administra el inventario de GMP Packing Scissors Knives
 * 
 * @export
 * @class GMPPackingScissorsKnivesInventoryComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-scissors-knives-inventory',
  templateUrl: './gmp.packing.scissors.knives.inventory.html'
})

export class GMPPackingScissorsKnivesInventoryComponent implements OnInit {
  @Language() private lang: string
  @Input() private inventory: Array<InventoryItem> = []
  private emptyInventoryFlag: boolean = null
  private scrollAllowed: boolean = true

  constructor(public events: Events,
    public modalController: ModalController,
    public navCtrl: NavController,
    public ts: TService,
    private inventoryService: InventoryService) {

  }

  /**
   * Se suscribe a los eventos de control de scroll y recupera el inventario
   * del servicio de inventarios al inicializar el componente
   * 
   * @memberof GMPPackingScissorsKnivesInventoryComponent
   */
  
  public ngOnInit(): void {
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.subscribe("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.inventoryService.getInventory("inventory-gmp-packing-scissors-knives").then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    }, error => {
      // Por el momento, no se necesita ninguna acción adicional en caso de
      // un error durante la recuperación de datos, ya que este caso se maneja
      // dentro del servicio de inventarios
    })
  }

  /**
   * Crea un modal para agregar un elemento de inventario de GMP Packing
   * Scissors Knives
   * 
   * @memberof GMPPackingScissorsKnivesInventoryComponent
   */

  public addItem(): void {
    let type_array: Array<{ id: number, name: string }> = []
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, name: temp.name })
    }
    let modal = this.modalController.create(GMPPackingScissorsKnivesAddItemComponent, { type_array: type_array })
    modal.present()
    modal.onDidDismiss(data => {
      if (data !== undefined && data !== null) {
        this.inventory.push(data.item)
        this.emptyInventoryFlag = false
      }
    })
  }

  /**
   * Actualiza una bandera que indica si el inventario se encuentra vacío
   * para permitirle a la vista mostrar un mensaje en consecuencia
   * 
   * @returns {boolean} 
   * @memberof GMPPackingScissorsKnivesInventoryComponent
   */

  public checkEmptyInventory(): boolean {
    // Para verificar que el inventario esté vacío, simplemente se revisa la
    // longitud del arreglo de inventario
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}