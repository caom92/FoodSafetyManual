import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryComponent } from '../../super-inventory/super.area.inventory'
import { GMPSelfInspectionPestControlAddAreaComponent } from '../add-area/gmp.self.inspection.pest.control.add.area'
import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-area-inventory',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.html'
})

export class GMPSelfInspectionPestControlAreaInventoryComponent extends SuperAreaInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryArea> = []

  constructor(events: Events, areaManagerService: AreaManagerService, modalController: ModalController) {
    super(events, areaManagerService, modalController)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-self-inspection-pest-control")
    super.ngOnInit()
  }

  public addArea(): void {
    console.log("Add area pest control")
    super.addArea(GMPSelfInspectionPestControlAddAreaComponent, null, (data) => {
      data.area.position = this.inventory.length + 1
      this.inventory.push(data.area)
      this.emptyInventoryFlag = false
    })
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}