import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { SuperInventoryAreaComponent } from '../../super-inventory/super.area.inventory.area'
import { GMPSelfInspectionPestControlEditAreaComponent } from '../edit-area/gmp.self.inspection.pest.control.edit.area'
import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-area-inventory-area',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.area.html'
})

export class GMPSelfInspectionPestControlAreaInventoryAreaComponent extends SuperInventoryAreaComponent {
  @Input() area: InventoryArea
  @Language() lang: string

  constructor(modalController: ModalController, events: Events) {
    super(modalController, events)
  }

  editArea() {
    super.editArea(GMPSelfInspectionPestControlEditAreaComponent, { area_id: this.area.id, area_name: this.area.name }, (data) => {
      this.events.publish("area:edit", this.area, data.area)
      this.area.name = data.area.name
    })
  }
}