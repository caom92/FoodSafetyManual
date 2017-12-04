import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'

import { ISubscription } from 'rxjs/Subscription'

import { Language } from 'angular-l10n'

import { InventoryType } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../../services/app.inventory'

@Component({
  selector: 'gmp-packing-scale-calibration-inventory-list',
  templateUrl: './gmp.packing.scale.calibration.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingScaleCalibrationInventoryListComponent implements OnInit, OnDestroy {
  @Language() lang: string
  @Input() type: InventoryType
  @Input() printHeader: boolean = false
  drag: ISubscription = null
  dragend: ISubscription = null
  originalInventory = null

  constructor(private dragulaService: DragulaService,
    public events: Events,
    private inventoryService: InventoryService) {

  }

  /**
   * Inicializa el servicio de Dragula para reordenar el inventario y gestiona
   * las peticiones al servicio de inventario para reflejar el reordenamiento
   * en el servidor
   * 
   * @memberof GMPPackingScaleCalibrationInventoryListComponent
   */

  public ngOnInit(): void {
    // Guardamos el inventario original 
    this.originalInventory = this.type.items.map(x => Object.assign({}, x))

    // Activamos las opciones de Dragula; en este caso nos interesa que el
    // elemento se pueda mover solo al hacer click sobre el ícono de la cruz
    // con flechas
    this.dragulaService.setOptions(this.type.name, {
      moves: function (el, container, handle) {
        return (handle.classList.contains('handle'))
      },
      revertOnSpill: true
    })

    // Al comenzar el desplazamiento de un elemento de inventario, se detiene
    // la posibilidad de realizar scroll
    this.drag = this.dragulaService.drag.subscribe((value) => {
      if (value[0] == this.type.name) {
        this.events.publish("scroll:stop", "Scroll Stopped")
      }
    })

    // Al terminar el desplazamiento de un elemento de inventario, se habilita
    // la posibilidad de realizar scroll
    this.dragend = this.dragulaService.dragend.subscribe((value) => {
      if (value[0] == this.type.name) {
        this.events.publish("scroll:start", "Scroll Started")
        let index = 1
        let reorderedItemArray: Array<{ id: number, position: number }> = []

        for (let item in this.type.items) {
          this.type.items[item].position = index++
          reorderedItemArray.push({
            id: this.type.items[item].id,
            position: this.type.items[item].position
          })
        }

        this.inventoryService.reorderInventory(reorderedItemArray, "reorder-gmp-packing-scale-calibration").then(success => {
          this.originalInventory = this.type.items.map(x => Object.assign({}, x))
        }, error => {
          this.type.items = this.originalInventory.map(x => Object.assign({}, x))
        })
      }
    })
  }

  /**
   * Desuscribe el servicio de Dragula para que este no interfiera al volver a
   * abrir este u otros inventarios
   * 
   * @memberof GMPPackingScaleCalibrationInventoryListComponent
   */

  public ngOnDestroy(): void {
    if (this.dragulaService.find(this.type.name) !== undefined) {
      console.warn("Dragula bag " + this.type.name + " destroyed")
      this.drag.unsubscribe()
      this.dragend.unsubscribe()
      this.dragulaService.destroy(this.type.name)
    } else {
      console.error("No Dragula bag present on gmp-packing-scale-calibration Inventory")
    }
  }
}