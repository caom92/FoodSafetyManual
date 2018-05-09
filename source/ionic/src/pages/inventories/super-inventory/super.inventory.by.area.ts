import { OnDestroy, OnInit } from '@angular/core'
import { Events, ModalController } from 'ionic-angular'

import { AreaManagerService } from '../../../services/app.area.manager'
import { InventoryService } from '../../../services/app.inventory'
import { SuperInventoryAreaInterface } from './super.area.inventory.interface'
import { SuperInventoryComponent } from './super.inventory'

export class SuperInventoryByAreaComponent extends SuperInventoryComponent implements OnInit, OnDestroy {
  protected areas: Array<SuperInventoryAreaInterface> = null
  protected selectedArea: number = null

  constructor(events: Events, inventoryService: InventoryService, modalController: ModalController, private areaManagerService: AreaManagerService) {
    super(events, inventoryService, modalController)
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

    this.events.subscribe("area:add", (data) => {
      this.areas.push(data)
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    })

    this.events.subscribe("area:edit", (oldData, newData) => {
      let index = this.areas.findIndex((x => x.id==oldData.id))
      this.areas[index].name = newData.name
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    })

    this.areaManagerService.getAreaInventory(this.suffix).then(success => {
      this.areas = success
    }, error => {
      
    })
  }

  public loadAreaInventory(event): void {
    this.inventoryService.getInventoryByArea(this.suffix, {room_id: event, area_id: event}).then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    })
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy()
    this.events.unsubscribe("area:add")
    this.events.unsubscribe("area:edit")
  }
}