import { OnDestroy, OnInit } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'
import { DragulaService } from 'ng2-dragula'

import { AreaManagerService } from '../../../services/app.area.manager'
import { DragulaInventory } from './dragula.inventory'

export abstract class SuperAreaInventoryComponent extends DragulaInventory implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  protected suffix: string = null
  protected bagName: string = null
  protected options: any = {
    moves: function (el, container, handle) {
      return (handle.classList.contains('handle'))
    },
    removeOnSpill: false
  }
  scrollStartSubscription: Subscription
  scrollStopSubscription: Subscription
  areaAdd: Subscription

  constructor(dragulaService: DragulaService, protected events: PubSubService, private areaManagerService: AreaManagerService) {
    super(dragulaService)
  }

  public ngOnInit(): void {
    this.scrollStopSubscription = this.events.$sub('scroll:stop', (message) => {
      this.scrollAllowed = false
    })

    this.scrollStartSubscription = this.events.$sub('scroll:start', (message) => {
      this.scrollAllowed = true
    })

    this.areaAdd = this.events.$sub('area:add', (data) => {
      this.inventory.push(data)
    })

    this.areaManagerService.getAreaInventoryByPosition(this.suffix).then(success => {
      this.inventory = success
      this.initDragula()
      this.checkEmptyInventory()
    })
  }

  public initDragula(): void {
    this.addGroup(this.bagName)
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public setBagName(name: string): void {
    this.bagName = name
  }

  public ngOnDestroy(): void {
    this.scrollStartSubscription.unsubscribe()
    this.scrollStopSubscription.unsubscribe()
  }

  public abstract checkEmptyInventory(): boolean
}