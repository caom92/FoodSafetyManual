import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { AlertController, ViewController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperInventoryAddAreaComponent } from '../../super-inventory/super.area.inventory.add.area'

@Component({
  selector: 'gmp-packing-preop-add-area',
  templateUrl: './gmp.packing.preop.add.area.html'
})

export class GMPPackingPreopAddAreaComponent extends SuperInventoryAddAreaComponent implements OnInit {
  constructor(viewCtrl: ViewController,
    _fb: FormBuilder,
    alertCtrl: AlertController,
    ts: TService,
    areaManagerService: AreaManagerService) {
    super(viewCtrl, _fb, alertCtrl, ts, areaManagerService)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-preop")
    this.createItemForm({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public addArea(): void {
    let data = { area: { id: 0, name: this.newArea.value.name, position: 0 } }
    let itemData = { area_name: this.newArea.value.name }
    super.addArea(data, itemData)
  }
}