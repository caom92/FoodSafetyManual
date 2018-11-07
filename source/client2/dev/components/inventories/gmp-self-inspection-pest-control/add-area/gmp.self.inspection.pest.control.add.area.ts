import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AlertController } from '../../../../services/alert/app.alert'
import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperInventoryAddAreaComponent } from '../../super-inventory/super.area.inventory.add.area'

@Component({
  selector: 'gmp-self-inspection-pest-control-add-area',
  templateUrl: './gmp.self.inspection.pest.control.add.area.html'
})

export class GMPSelfInspectionPestControlAddAreaComponent extends SuperInventoryAddAreaComponent implements OnInit {
  constructor(_fb: FormBuilder,
    alertCtrl: AlertController,
    ts: TService,
    areaManagerService: AreaManagerService,
    events: PubSubService) {
    super(_fb, alertCtrl, ts, areaManagerService, events)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-self-inspection-pest-control')
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