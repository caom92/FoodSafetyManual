import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'
import { DragulaService } from 'ng2-dragula'

import { AreaInventoryService } from '../../../services/area-inventory.service'
import { InventoryService } from '../../../services/inventory.service'
import { SuperInventoryAreaInterface } from './super.area.inventory.interface'
import { SuperInventoryComponent } from './super.inventory'

export class SuperInventoryByAreaComponent extends SuperInventoryComponent {
  protected areas: Array<SuperInventoryAreaInterface> = null
  protected selectedArea: number = null
  areaAddSubscription: Subscription
  areaEditSubscription: Subscription

  constructor(events: PubSubService, inventoryService: InventoryService, dragulaService: DragulaService, private areaInventoryService: AreaInventoryService) {
    super(dragulaService, events, inventoryService)
  }

  public ngOnInit(): void {
    this.scrollStopSubscription = this.events.$sub('scroll:stop').subscribe((message) => {
      this.scrollAllowed = false
    })

    this.scrollStartSubscription = this.events.$sub('scroll:start').subscribe((message) => {
      this.scrollAllowed = true
    })

    this.areaAddSubscription = this.events.$sub('area:add', (data) => {
      this.areas.push(data)
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    })

    this.areaEditSubscription = this.events.$sub('area:edit', (data) => {
      let index = this.areas.findIndex((x => x.id==data.id))
      this.areas[index].name = data.name
      this.areas.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    })

    this.areaInventoryService.getAreaInventory(this.suffix).then(success => {
      this.areas = success
    })
  }

  public loadAreaInventory(event): void {
    this.inventoryService.getInventoryByArea(this.suffix, { room_id: event, area_id: event }).then(success => {
      this.inventory = success
      this.initDragula()
      this.onInventoryUpdate()
      this.checkEmptyInventory()
    })
  }

  public checkEmptyInventory(): boolean {
    return false
  }

  public onInventoryUpdate(): void {
    
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy()
    this.areaAddSubscription.unsubscribe()
    this.areaEditSubscription.unsubscribe()
  }
}