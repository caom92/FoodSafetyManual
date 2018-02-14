import { OnInit, OnDestroy } from '@angular/core'
import { InventoryService } from '../../../services/app.inventory'
import { PubSubService } from 'angular2-pubsub'
import { SuperInventoryItemInterface } from './super.inventory.interface'
import { DragulaService } from 'ng2-dragula'
import { Subscription } from 'rxjs/Subscription'

export class SuperInventoryComponent implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  protected suffix: string = null
  protected options: any = {
    moves: function (el, container, handle) {
      return (handle.classList.contains('handle'))
    },
    removeOnSpill: false
  }
  scrollStop: Subscription
  scrollStart: Subscription

  constructor(protected events: PubSubService, protected inventoryService: InventoryService, private dragulaService: DragulaService) {

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

    this.inventoryService.getInventory("inventory-" + this.suffix).then(success => {
      this.inventory = success
      this.onInventoryUpdate()
      this.checkEmptyInventory()
    })
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public ngOnDestroy(): void {
    this.scrollStart.unsubscribe()
    this.scrollStop.unsubscribe()
  }

  public onInventoryUpdate(): void {
    throw "onInventoryUpdate() function must be overridden in child class" + this.constructor.toString().match(/\w+/g)[1]
  }

  public checkEmptyInventory(): boolean {
    throw "checkEmptyInventory() function must be overridden in child class" + this.constructor.toString().match(/\w+/g)[1]
  }
}