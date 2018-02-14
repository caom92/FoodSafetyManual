import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { SuperInventoryAreaComponent } from '../../super-inventory/super.area.inventory.area'
import { GMPPackingGlassBrittleEditAreaComponent } from '../edit-area/gmp.packing.glass.brittle.edit.area'
import { InventoryArea } from '../interfaces/gmp.packing.glass.brittle.area.inventory.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-area-inventory-area',
  templateUrl: './gmp.packing.glass.brittle.area.inventory.area.html'
})

export class GMPPackingGlassBrittleAreaInventoryAreaComponent extends SuperInventoryAreaComponent {
  @Input() area: InventoryArea
  @Language() lang: string

  constructor(modalController: ModalController, events: Events) {
    super(modalController, events)
  }

  editArea() {
    super.editArea(GMPPackingGlassBrittleEditAreaComponent, { area_id: this.area.id, area_name: this.area.name }, (data) => {
      this.events.publish("area:edit", this.area, data.area)
      this.area.name = data.area.name
    })
  }
}