import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogItem } from '../interfaces/gap-packing-harvest-block-inspection-log.interface'

@Component({
  selector: 'gap-packing-harvest-block-inspection-item',
  templateUrl: './gap-packing-harvest-block-inspection-item.component.html'
})

export class GAPPackingHarvestBlockInspectionItemComponent {
  @Input() item: LogItem
  @Input() itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}