import { Component, Input, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { SuperInventoryAreaComponent } from '../../super-inventory/super.area.inventory.area'
import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'

//import { GMPSelfInspectionPestControlEditAreaComponent } from '../edit-area/gmp.self.inspection.pest.control.edit.area'

@Component({
  selector: 'gmp-self-inspection-pest-control-area-inventory-area',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.area.html'
})

export class GMPSelfInspectionPestControlAreaInventoryAreaComponent extends SuperInventoryAreaComponent implements OnInit {
  @Input() area: InventoryArea
  @Language() lang: string

  constructor(modalController: ModalController,
    events: Events){
    super(modalController, events)
  }

  ngOnInit(){
    console.log("single area")
    console.log(this.area)
  }

  editArea(){
    /*super.editArea(GMPSelfInspectionPestControlEditAreaComponent, {area_id:this.area.id}, (data) => {
      this.events.publish("area:edit", this.area, data.area)
      this.area.name = data.area.name
    })*/
  }
}