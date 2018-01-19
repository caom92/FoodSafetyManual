import { OnDestroy, OnInit } from '@angular/core'
import { Events, ModalController } from 'ionic-angular'

import { AreaManagerService } from '../../../services/app.area.manager'

export class SuperAreaInventoryComponent implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  private suffix: string = null

  constructor(protected events: Events, private areaManagerService: AreaManagerService, protected modalController: ModalController) {

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

    this.areaManagerService.getAreaInventoryByPosition(this.suffix).then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    })
  }

  public addArea(addAreaComponet: any, data: any, handler: Function): void {
    let modal = this.modalController.create(addAreaComponet, data)
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