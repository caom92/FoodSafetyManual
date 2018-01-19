import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Language, TranslationService as TService } from 'angular-l10n'
import { AlertController, NavParams, ViewController } from 'ionic-angular'

import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperInventoryEditAreaComponent } from '../../super-inventory/super.area.inventory.edit.area'

@Component({
  selector: 'gmp-self-inspection-pest-control-edit-area',
  templateUrl: './gmp.self.inspection.pest.control.edit.area.html'
})

export class GMPSelfInspectionPestControlEditAreaComponent extends SuperInventoryEditAreaComponent {
  @Language() lang: string

  constructor(params: NavParams, viewCtrl: ViewController, _fb: FormBuilder, alertCtrl: AlertController, ts: TService, areaManagerService: AreaManagerService) {
    super(params, viewCtrl, _fb, alertCtrl, ts, areaManagerService)
  }

  public ngOnInit(): void {
    super.ngOnInit()
    console.log(this)
    this.setSuffix("gmp-self-inspection-pest-control")
    this.createItemForm({
      name: [String(this.area_name), [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public addItem(): void {
    super.editArea({ area: { id: this.area_id, name: this.newArea.value.name, position: 0 } }, { area_name: this.newArea.value.name, area_id: this.area_id, name: this.newArea.value.name, room_id: this.area_id })
  }
}