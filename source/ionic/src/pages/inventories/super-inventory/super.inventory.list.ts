import { OnInit, OnDestroy } from '@angular/core'
import { InventoryService } from '../../../services/app.inventory'
import { DragulaService } from 'ng2-dragula'
import { ISubscription } from 'rxjs/Subscription'
import { Events } from 'ionic-angular'
import { SuperInventoryItemInterface } from './super.inventory.interface'

/**
 * Clase padre que pueden usar los componentes de cualquier inventario para
 * desplegar y controlar una lista de inventario.
 * 
 * Una lista puede ser:
 * 
 * 1) La totalidad del inventario de una bitácora
 * 2) Un conjunto de elementos de inventario, separados por tipo o algún otro
 *    método de distinción
 * 
 * @export
 * @class SuperInventoryItemComponent
 */

export class SuperInventoryListComponent implements OnInit, OnDestroy {
  protected drag: ISubscription = null
  protected dragend: ISubscription = null
  protected bagName: string = null
  protected currentInventory: Array<SuperInventoryItemInterface> = null
  protected originalInventory: Array<SuperInventoryItemInterface> = null
  private suffix: string = null

  constructor(protected dragulaService: DragulaService,
    public events: Events,
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

  public setInventory(inventory: Array<SuperInventoryItemInterface>) {
    this.currentInventory = inventory
  }

  /**
   * Asigna un inventario temporal, necesario para revertir los cambios de
   * reordenamiento durante un error en la comunicación con el servidor o debido
   * a una petición mal formulada
   * 
   * @param {Array<SuperInventoryItemInterface>} inventory 
   * @memberof SuperInventoryListComponent
   */

  public setOriginalInventory(inventory: Array<SuperInventoryItemInterface>) {
    this.originalInventory = this.currentInventory.map(x => Object.assign({}, x))
  }

  /**
   * Inicializa la configuración de Dragula y de los eventos relacionados con el
   * reordenamiento, tales como habilitar/inhabilitar el scroll y mandar al
   * servicio de inventarios la petición para reordenar el inventario
   * 
   * @memberof SuperInventoryListComponent
   */

  public ngOnInit(): void {
    console.log("Super component bag name: " + this.bagName)
    // Guardamos el inventario original 
    this.originalInventory = this.currentInventory.map(x => Object.assign({}, x))

    // Activamos las opciones de Dragula; en este caso nos interesa que el
    // elemento se pueda mover solo al hacer click sobre el ícono de la cruz
    // con flechas
    this.dragulaService.setOptions(this.bagName, {
      moves: function (el, container, handle) {
        return (handle.classList.contains('handle'))
      },
      revertOnSpill: true
    })

    // Al comenzar el desplazamiento de un elemento de inventario, se detiene
    // la posibilidad de realizar scroll
    this.drag = this.dragulaService.drag.subscribe((value) => {
      if (value[0] == this.bagName) {
        this.events.publish("scroll:stop", "Scroll Stopped")
      }
    })

    // Al terminar el desplazamiento de un elemento de inventario, se habilita
    // la posibilidad de realizar scroll
    this.dragend = this.dragulaService.dragend.subscribe((value) => {
      if (value[0] == this.bagName) {
        this.events.publish("scroll:start", "Scroll Started")
        let index = 1
        let reorderedItemArray: Array<{ id: number, position: number }> = []

        for (let item in this.currentInventory) {
          this.currentInventory[item].position = index++
          reorderedItemArray.push({
            id: this.currentInventory[item].id,
            position: this.currentInventory[item].position
          })
        }

        this.inventoryService.reorderInventory(reorderedItemArray, "reorder-" + this.suffix).then(success => {
          this.originalInventory = this.currentInventory.map(x => Object.assign({}, x))
        }, error => {
          let temp = this.originalInventory.map(x => Object.assign({}, x))
          for(let index in temp){
            for(let prop in this.currentInventory[index]){
              this.currentInventory[index][prop] = temp[index][prop]
            }
          }
          //this.currentInventory = this.originalInventory.map(x => Object.assign({}, x))
        })
      }
    })
  }

  /**
   * Desuscribe el servicio de Dragula para que este no interfiera al volver a
   * abrir este u otros inventarios
   * 
   * @memberof SuperInventoryListComponent
   */

  public ngOnDestroy(): void {
    if (this.dragulaService.find(this.bagName) !== undefined) {
      console.warn("Dragula bag " + this.bagName + " destroyed")
      this.drag.unsubscribe()
      this.dragend.unsubscribe()
      this.dragulaService.destroy(this.bagName)
    } else {
      console.error("No Dragula bag " + this.bagName + " on this inventory lists")
    }
  }
}