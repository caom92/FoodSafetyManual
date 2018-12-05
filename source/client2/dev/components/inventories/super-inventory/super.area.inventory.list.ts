import { OnDestroy, OnInit } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula'
import { Subscription } from 'rxjs'

import { AreaManagerService } from '../../../services/app.area.manager'
import { SuperInventoryAreaInterface } from './super.area.inventory.interface'

export abstract class SuperAreaInventoryListComponent implements OnInit, OnDestroy {
  protected drag: Subscription = new Subscription()
  protected dragend: Subscription = new Subscription()
  protected bagName: string = null
  protected currentInventory: Array<SuperInventoryAreaInterface> = null
  protected originalInventory: Array<SuperInventoryAreaInterface> = null
  private suffix: string = null

  constructor(protected dragulaService: DragulaService,
    public events: PubSubService,
    protected areaManagerService: AreaManagerService) {

  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public setBagName(name: string): void {
    this.bagName = name
  }

  public abstract getCurrentInventory(): Array<SuperInventoryAreaInterface>

  /*public setInventory(inventory: Array<SuperInventoryAreaInterface>) {
    this.currentInventory = inventory
  }*/

  public setOriginalInventory(inventory?: Array<SuperInventoryAreaInterface>) {
    if (this.getCurrentInventory() != null) {
      this.originalInventory = this.currentInventory.map(x => Object.assign({}, x))
    }
  }

  public ngOnInit(): void {
    // Guardamos el inventario original 
    //this.originalInventory = this.currentInventory.map(x => Object.assign({}, x))

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

        this.areaManagerService.reorderAreaInventory(reorderedItemArray, this.suffix).then(success => {

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

  public ngOnDestroy(): void {
    if (this.dragulaService.find(this.bagName) !== undefined) {
      console.warn('Dragula bag ' + this.bagName + ' destroyed')
      this.drag.unsubscribe()
      this.dragend.unsubscribe()
    } else {
      console.error('No Dragula bag ' + this.bagName + ' on this inventory lists')
    }
  }
}