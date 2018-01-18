import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryByAreaComponent } from '../../super-inventory/super.inventory.by.area'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'
import { GMPSelfInspectionPestControlAddItemComponent } from '../add-item/gmp.self.inspection.pest.control.add.item'

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory',
  templateUrl: './gmp.self.inspection.pest.control.inventory.html'
})

export class GMPSelfInspectionPestControlInventoryComponent extends SuperInventoryByAreaComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: Events,
    inventoryService: InventoryService,
    modalController: ModalController,
    areaManagerService: AreaManagerService) {
    super(events, inventoryService, modalController, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-self-inspection-pest-control")
    super.ngOnInit()
  }

  public addItem(): void {
    super.addItem(GMPSelfInspectionPestControlAddItemComponent, { area_id: this.selectedArea }, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
      this.emptyInventoryFlag = false
    })
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}