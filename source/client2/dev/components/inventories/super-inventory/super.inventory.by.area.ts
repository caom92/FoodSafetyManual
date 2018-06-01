import { OnDestroy, OnInit } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { DragulaService } from 'ng2-dragula/components/dragula.provider'
import { Subscription } from 'rxjs/Subscription'

import { AreaManagerService } from '../../../services/app.area.manager'
import { InventoryService } from '../../../services/app.inventory'
import { SuperInventoryAreaInterface } from './super.area.inventory.interface'
import { SuperInventoryComponent } from './super.inventory'

export class SuperInventoryByAreaComponent extends SuperInventoryComponent implements OnInit, OnDestroy {
  protected areas: Array<SuperInventoryAreaInterface> = null
  protected selectedArea: number = null
  areaAdd: Subscription
  areaEdit: Subscription

  constructor(events: PubSubService, inventoryService: InventoryService, dragulaService: DragulaService, private areaManagerService: AreaManagerService) {
    super(events, inventoryService, dragulaService)
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

    this.areaAdd = this.events.$sub("area:add", (data) => {
      this.areas.push(data)
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
      //this.areas.sort((a, b) => a.name.localeCompare(b.name))
    })

    this.areaEdit = this.events.$sub("area:edit", (data) => {
      let index = this.areas.findIndex((x => x.id==data.id))
      this.areas[index].name = data.name
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    })

    this.areaManagerService.getAreaInventory(this.suffix).then(success => {
      this.areas = success
    })
  }

  public loadAreaInventory(event): void {
    this.inventoryService.getInventoryByArea(this.suffix, {room_id: event, area_id: event}).then(success => {
      this.inventory = success
      this.onInventoryUpdate()
      this.checkEmptyInventory()
    })
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy()
    this.areaAdd.unsubscribe()
    this.areaEdit.unsubscribe()
  }
}