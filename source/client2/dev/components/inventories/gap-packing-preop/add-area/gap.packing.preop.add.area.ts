import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { TranslationService } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AlertController } from '../../../../services/alert/app.alert'
import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperInventoryAddAreaComponent } from '../../super-inventory/super.area.inventory.add.area'

@Component({
  selector: 'gap-packing-preop-add-area',
  templateUrl: './gap.packing.preop.add.area.html'
})

export class GAPPackingPreopAddAreaComponent extends SuperInventoryAddAreaComponent implements OnInit {
  constructor(_fb: FormBuilder,
    alertCtrl: AlertController,
    translationService: TranslationService,
    areaManagerService: AreaManagerService,
    events: PubSubService) {
    super(_fb, alertCtrl, translationService, areaManagerService, events)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-preop')
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