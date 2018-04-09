import { OnDestroy, OnInit, Type } from '@angular/core'
import { Events, ModalController } from 'ionic-angular'

import { InventoryService } from '../../../services/app.inventory'
import { SuperInventoryAddItemComponent } from './super.inventory.add.item'

export class SuperInventoryComponent implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  protected suffix: string = null

  constructor(protected events: Events, protected inventoryService: InventoryService, protected modalController: ModalController) {

  }

  public ngOnInit(): void {
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.subscribe("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.inventoryService.getInventory(this.suffix).then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    }, error => {
      
    })
  }

  public addItem(addItemComponet: Type<SuperInventoryAddItemComponent>, data: any, handler: Function): void {
    let modal = this.modalController.create(addItemComponet, data)
    modal.present()
    modal.onDidDismiss(data => {
      if (data !== undefined && data !== null) {
        handler(data)
        this.emptyInventoryFlag = false
      }
    })
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public ngOnDestroy(): void {
    this.events.unsubscribe("scroll:stop")
    this.events.unsubscribe("scroll:start")
  }

  public checkEmptyInventory(): boolean {
    throw "checkEmptyInventory() function must be overridden in child class"
  }
}