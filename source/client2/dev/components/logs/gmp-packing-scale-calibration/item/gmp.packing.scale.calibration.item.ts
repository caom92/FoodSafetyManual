import { Component, Input, OnChanges } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogItem, LogUnit } from '../interfaces/gmp.packing.scale.calibration.log.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-item',
  templateUrl: './gmp.packing.scale.calibration.item.html'
})

export class GMPPackingScaleCalibrationItemComponent implements OnChanges {
  @Input() item: LogItem
  @Input() units: Array<LogUnit>
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string
  @Input() last: boolean

  constructor() {

  }

  ngOnChanges() {
    console.log("onchanges")
    $("select").material_select()
    $("select").material_select()
  }
}