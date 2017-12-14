import { Component, Input } from '@angular/core'
import { Events, ModalController } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { InventoryArea } from '../interfaces/gap.packing.preop.area.inventory.interface'

import { GAPPackingPreopEditAreaComponent } from '../edit-area/gap.packing.preop.edit.area'

@Component({
  selector: 'gap-packing-preop-area-inventory-area',
  templateUrl: './gap.packing.preop.area.inventory.area.html'
})

export class GAPPackingPreopAreaInventoryAreaComponent {
  @Input() area: InventoryArea
  @Language() lang: string

  constructor(public modalController: ModalController,
    public events: Events){

  }

  editArea(){
    let editModal = this.modalController

    let modal = this.modalController.create(GAPPackingPreopEditAreaComponent, {area_id:this.area.id})
    modal.present()
    modal.onDidDismiss(data => {
      if(data){
        this.events.publish("area:edit", this.area, data.area)
        this.area.name = data.area.name
      }
    })
  }
}