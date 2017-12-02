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
  templateUrl: './gmp.packing.hand.washing.inventory.html'
})

export class GMPPackingHandWashingInventoryComponent implements OnInit {
  @Language() private lang: string
  @Input() private inventory: Array<InventoryItem> = []
  private emptyInventoryFlag: boolean = null
  private scrollAllowed: boolean = true

  constructor(public events: Events,
    public modalController: ModalController,
    public server: BackendService,
    public navCtrl: NavController,
    public loaderService: LoaderService,
    public ts: TService,
    private toastService: ToastService,
    private inventoryService: InventoryService) {

  }

  /**
   * Se suscribe a los eventos de control de scroll y recupera el inventario
   * del servicio de inventarios al inicializar el componente
   * 
   * @memberof GMPPackingHandWashingInventoryComponent
   */

  public ngOnInit(): void {
    // Nos suscribimos al evento scroll:stop que indica que se debe inhabilitar
    // el scroll durante un reordenamiento de inventario
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    // Nos suscribimos al evento scroll:start que indica que se debe habilitar
    // el scroll al terminar un reordenamiento de inventario
    this.events.subscribe("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    // Utilizamos el servicio de inventarios para recuperar el inventario,
    // indicando el nombre del servicio para esta bitácora en particular
    this.inventoryService.getInventory("inventory-gmp-packing-hand-washing").then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    }, error => {
      // Por el momento, no se necesita ninguna acción adicional en caso de
      // un error durante la recuperación de datos
    })
  }

  /**
   * Crea un modal para agregar un elemento para este inventario
   * 
   * @memberof GMPPackingHandWashingInventoryComponent
   */

  public addItem(): void {
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

  public checkEmptyInventory(): boolean {
    // Para revisar si el inventario está vacío o no, simplemente verificamos
    // el tamaño del array de inventario
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}