import { OnDestroy, OnInit } from '@angular/core'

import { AreaManagerService } from '../../../services/app.area.manager'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'rxjs/Subscription'

export class SuperAreaInventoryComponent implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  private suffix: string = null
  protected options: any = {
    moves: function (el, container, handle) {
      return (handle.classList.contains('handle'))
    },
    removeOnSpill: false
  }
  scrollStartSubscription: Subscription
  scrollStopSubscription: Subscription
  areaAdd: Subscription

  constructor(protected events: PubSubService, private areaManagerService: AreaManagerService) {

  }

  public ngOnInit(): void {
    this.scrollStopSubscription = this.events.$sub("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.scrollStartSubscription = this.events.$sub("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.areaAdd = this.events.$sub("area:add", (data) => {
      console.log(data)
      this.inventory.push(data)
    })

    this.areaManagerService.getAreaInventoryByPosition(this.suffix).then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    })
  }

  /*public addArea(addAreaComponet: any, data: any, handler: Function): void {
    let modal = this.modalController.create(addAreaComponet, data)
    modal.present()
    modal.onDidDismiss(data => {
      if (data !== undefined && data !== null) {
        handler(data)
        this.emptyInventoryFlag = false
      }
    })
  }*/

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public ngOnDestroy(): void {
    this.scrollStartSubscription.unsubscribe()
    this.scrollStopSubscription.unsubscribe()
  }

  public checkEmptyInventory(): boolean {
    throw "checkEmptyInventory() function must be overridden in child class"
  }
}