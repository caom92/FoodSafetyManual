import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { AlertController, ViewController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperInventoryAddAreaComponent } from '../../super-inventory/super.area.inventory.add.area'

@Component({
  selector: 'gmp-self-inspection-pest-control-add-area',
  templateUrl: './gmp.self.inspection.pest.control.add.area.html'
})

export class GMPSelfInspectionPestControlAddAreaComponent extends SuperInventoryAddAreaComponent implements OnInit {
  constructor(viewCtrl: ViewController,
    _fb: FormBuilder,
    alertCtrl: AlertController,
    ts: TService,
    areaManagerService: AreaManagerService) {
    super(viewCtrl, _fb, alertCtrl, ts, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-self-inspection-pest-control")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public addArea(): void {
    let data = { area: { id: 0, name: this.newArea.value.name, position: 0 } }
    let itemData = { name: this.newArea.value.name }
    super.addArea(data, itemData)
  }
}