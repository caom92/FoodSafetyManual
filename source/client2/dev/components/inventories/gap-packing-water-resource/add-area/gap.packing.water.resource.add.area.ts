import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AreaInventoryService } from '../../../../services/area-inventory.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { SuperInventoryAddAreaComponent } from '../../super-inventory/super.area.inventory.add.area'

@Component({
  selector: 'gap-packing-water-resource-add-area',
  templateUrl: './gap.packing.water.resource.add.area.html'
})

export class GAPPackingWaterResourceAddAreaComponent extends SuperInventoryAddAreaComponent implements OnInit {
  @Language() lang: string
  
  constructor(_fb: FormBuilder, areaInventoryService: AreaInventoryService, events: PubSubService, formUtilService: FormUtilService) {
    super(_fb, areaInventoryService, events, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-water-resource')
    this.createItemForm({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public addArea(): void {
    let data = { area: { id: 0, name: this.newArea.value.name, position: 0 } }
    let itemData = { area_name: this.newArea.value.name }
    super.addArea(data, itemData)
  }
}