import { Component, Input, OnInit } from '@angular/core'
import { ModalController, Events, NavController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.hand.washing.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GMPPackingHandWashingAddItemComponent } from '../add-item/gmp.packing.hand.washing.add.item'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'
import { InventoryService } from '../../../../services/app.inventory'

/**
 * Componente que administra el inventario de GMP Packing Hand Washing
 * 
 * @export
 * @class GMPPackingHandWashingInventoryComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'gmp-packing-hand-washing-inventory',
  templateUrl: './gmp.packing.hand.washing.inventory.html',
  providers: [
    BackendService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingHandWashingInventoryComponent implements OnInit {
  @Language() lang: string
  @Input() inventory: Array<InventoryItem> = []
  emptyInventoryFlag: boolean = null
  scrollAllowed: boolean = true

  constructor(public events: Events,
    public modalController: ModalController,
    public server: BackendService,
    public navCtrl: NavController,
    public loaderService: LoaderService,
    public ts: TService,
    private toastService: ToastService,
    private inventoryService: InventoryService) {

  }

  ngOnInit() {
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.subscribe("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.inventoryService.getInventory("inventory-gmp-packing-hand-washing").then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    }, error => {
      //this.navCtrl.pop()
    })
  }

  /**
   * Crea un modal para agregar un elemento para este inventario
   * 
   * @memberof GMPPackingHandWashingInventoryComponent
   */

  addItem() {
    let type_array: Array<{ id: number, name: string }> = []
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, name: temp.name })
    }
    let modal = this.modalController.create(GMPPackingHandWashingAddItemComponent, { type_array: type_array })
    modal.present()
    modal.onDidDismiss(data => {
      if (data) {
        this.inventory.push(data.item)
        this.emptyInventoryFlag = false
      }
    })
  }

  /**
   * Actualiza una bandera que indica si el inventario se encuentra vacío
   * para permitirle a la vista mostrar un mensaje en consecuencia
   * 
   * @returns 
   * @memberof GMPPackingHandWashingInventoryComponent
   */

  checkEmptyInventory() {
    // Para revisar si el inventario está vacío o no, simplemente verificamos
    // el tamaño del array de inventario
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}