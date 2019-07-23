import { OnDestroy, OnInit } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { Subscription as LegacySubscription } from 'angular2-pubsub/node_modules/rxjs'
import { DragulaService } from 'ng2-dragula'
import { Subscription } from 'rxjs'

import { InventoryService } from '../../../services/inventory.service'
import { SuperInventoryItemInterface } from './super.inventory.interface'

export abstract class SuperInventoryListComponent implements OnInit, OnDestroy {
  @Language() lang: string
  protected drag: Subscription = new Subscription()
  protected dragend: Subscription = new Subscription()
  protected itemEvent: LegacySubscription
  protected bagName: string = null
  protected currentInventory: Array<Array<SuperInventoryItemInterface>> = [[]]
  protected originalInventory: Array<SuperInventoryItemInterface> = null
  protected suffix: string = null

  constructor(protected dragulaService: DragulaService,
    public events: PubSubService,
    protected inventoryService: InventoryService) {

  }

  /**
   * Asigna el sufijo que identifica a la bitácora, necesario para llamar a los
   * servicios correspondientes a la bitácora particular
   * 
   * @param {string} suffix 
   * @memberof SuperInventoryListComponent
   */

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  /**
   * Asigna un nombre a la bolsa de Dragula, el cual debe ser único
   * 
   * @param {string} name 
   * @memberof SuperInventoryListComponent
   */

  public setBagName(name: string): void {
    this.bagName = name
  }

  /**
   * Asigna el inventario que será administrado en la pantalla de inventario
   * 
   * @param {Array<SuperInventoryItemInterface>} inventory 
   * @memberof SuperInventoryListComponent
   */

  /*public setInventory(inventory: Array<SuperInventoryItemInterface>) {
    this.currentInventory = inventory
  }*/

  public abstract getCurrentInventory(): Array<SuperInventoryItemInterface>

  /**
   * Asigna un inventario temporal, necesario para revertir los cambios de
   * reordenamiento durante un error en la comunicación con el servidor o debido
   * a una petición mal formulada
   * 
   * @param {Array<SuperInventoryItemInterface>} inventory 
   * @memberof SuperInventoryListComponent
   */

  public setOriginalInventory(inventory?: Array<SuperInventoryItemInterface>) {
    if (this.getCurrentInventory() != null) {
      this.originalInventory = this.getCurrentInventory().map(x => Object.assign({}, x))
    }
  }

  /**
   * Inicializa la configuración de Dragula y de los eventos relacionados con el
   * reordenamiento, tales como habilitar/inhabilitar el scroll y mandar al
   * servicio de inventarios la petición para reordenar el inventario
   * 
   * @memberof SuperInventoryListComponent
   */

  public ngOnInit(): void {
    // Guardamos el inventario original 
    // this.originalInventory = this.currentInventory.map(x => Object.assign({}, x))
    // this.setOriginalInventory()

    this.itemEvent = this.events.$sub('item:add').subscribe((item) => {
      if (item.added == undefined) {
        this.onItemAdd(item)
      }
    })

    // Al comenzar el desplazamiento de un elemento de inventario, se detiene
    // la posibilidad de realizar scroll
    this.drag.add(this.dragulaService.drag(this.bagName).subscribe(
      ({ el, source }) => {
        this.setOriginalInventory()
        this.events.$pub('scroll:stop', 'Scroll Stopped')
      })
    )

    // Al terminar el desplazamiento de un elemento de inventario, se habilita
    // la posibilidad de realizar scroll
    this.dragend.add(this.dragulaService.dragend(this.bagName).subscribe(
      ({ name, el }) => {
        this.events.$pub('scroll:start', 'Scroll Started')
        let index = 1
        let reorderedItemArray: Array<{ id: number, position: number }> = []

        let currentInventory = this.getCurrentInventory()

        for (let item in currentInventory) {
          currentInventory[item].position = index++
          reorderedItemArray.push({
            id: currentInventory[item].id,
            position: currentInventory[item].position
          })
        }

        this.inventoryService.reorderInventory(this.suffix, reorderedItemArray).then(success => {

        }, error => {
          // it causes me physical pain to do this
          // empty array without loosing reference, since it's the reference
          // to the array used by Dragula
          currentInventory.splice(0, currentInventory.length)
          for (let item in this.originalInventory) {
            // add back the elements contained in the original inventory
            // to restore the inventory to the state before the network error
            currentInventory.push(this.originalInventory[item])
          }
        })
      })
    )
  }

  public onItemAdd(item: any): void {
    throw 'onItemAdd() function must be overridden in child class' + this.constructor.toString().match(/\w+/g)[1]
  }

  public ngOnDestroy(): void {
    if (this.dragulaService.find(this.bagName) !== undefined) {
      console.warn('Dragula bag ' + this.bagName + ' destroyed')
      this.drag.unsubscribe()
      this.dragend.unsubscribe()
      // this.dragulaService.destroy(this.bagName)
    } else {
      console.error('No Dragula bag ' + this.bagName + ' on this inventory lists')
    }

    this.itemEvent.unsubscribe()
  }
}