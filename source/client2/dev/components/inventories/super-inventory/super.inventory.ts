import { OnDestroy, OnInit } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../services/app.inventory'
import { DragulaInventory } from './dragula.inventory'

export abstract class SuperInventoryComponent extends DragulaInventory implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  protected bagName: string = null
  protected suffix: string = null
  protected options: any = {
    moves: function (el, container, handle) {
      return (handle.classList.contains('handle'))
    },
    removeOnSpill: false
  }
  scrollStop: Subscription
  scrollStart: Subscription

  constructor(dragulaService: DragulaService, protected events: PubSubService, protected inventoryService: InventoryService) {
    super(dragulaService)
  }

  public ngOnInit(): void {
    this.scrollStop = this.events.$sub("scroll:stop").subscribe((message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.scrollStart = this.events.$sub("scroll:start").subscribe((message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.inventoryService.getInventory(this.suffix).then(success => {
      this.inventory = success
      this.initDragula()
      this.onInventoryUpdate()
      this.checkEmptyInventory()
    })
  }

  public setBagName(name: string): void {
    this.bagName = name
  }

  public initDragula(): void {
    this.addGroup(this.bagName)
    console.log('initDragula() @ super.inventory.ts', this.dragulaService.find(this.bagName))
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public ngOnDestroy(): void {
    console.log('super.inventory.ts ngOnDestroy')
    this.scrollStart.unsubscribe()
    this.scrollStop.unsubscribe()
    this.destroy()
  }

  public abstract onInventoryUpdate(): void
  public abstract checkEmptyInventory(): boolean
}