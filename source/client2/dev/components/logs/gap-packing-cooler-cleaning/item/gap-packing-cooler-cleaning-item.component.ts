import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogCorrectiveAction, LogItem } from '../interfaces/gap-packing-cooler-cleaning-log.interface'

@Component({
  selector: 'gap-packing-cooler-cleaning-item',
  templateUrl: './gap-packing-cooler-cleaning-item.component.html'
})

export class GAPPackingCoolerCleaningItemComponent {
  @Input() item: LogItem
  @Input() actions: Array<LogCorrectiveAction>
  @Input() itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}
