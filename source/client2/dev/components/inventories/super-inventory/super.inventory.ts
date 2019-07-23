import { OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'
import { DragulaService } from 'ng2-dragula'

import { InventoryService } from '../../../services/inventory.service'
import { DragulaInventory } from './dragula.inventory'

export abstract class SuperInventoryComponent extends DragulaInventory implements OnInit, OnDestroy {
  @Language() lang: string
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  protected bagName: string = null
  protected suffix: string = null
  scrollStopSubscription: Subscription
  scrollStartSubscription: Subscription

  constructor(dragulaService: DragulaService, protected events: PubSubService, protected inventoryService: InventoryService) {
    super(dragulaService)
  }

  public ngOnInit(): void {
    this.scrollStopSubscription = this.events.$sub('scroll:stop').subscribe((message) => {
      this.scrollAllowed = false
    })

    this.scrollStartSubscription = this.events.$sub('scroll:start').subscribe((message) => {
      this.scrollAllowed = true
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
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public ngOnDestroy(): void {
    this.scrollStartSubscription.unsubscribe()
    this.scrollStopSubscription.unsubscribe()
    this.destroy()
  }

  public abstract onInventoryUpdate(): void
  public abstract checkEmptyInventory(): boolean
}