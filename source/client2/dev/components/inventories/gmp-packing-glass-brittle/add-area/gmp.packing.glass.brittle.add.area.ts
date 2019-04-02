import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { FormUtilService } from '../../../../services/form-util.service'
import { SuperInventoryAddAreaComponent } from '../../super-inventory/super.area.inventory.add.area'

@Component({
  selector: 'gmp-packing-glass-brittle-add-area',
  templateUrl: './gmp.packing.glass.brittle.add.area.html'
})

export class GMPPackingGlassBrittleAddAreaComponent extends SuperInventoryAddAreaComponent implements OnInit {
  @Language() lang: string

  constructor(_fb: FormBuilder, areaManagerService: AreaManagerService, events: PubSubService, formUtilService: FormUtilService) {
    super(_fb, areaManagerService, events, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-glass-brittle')
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