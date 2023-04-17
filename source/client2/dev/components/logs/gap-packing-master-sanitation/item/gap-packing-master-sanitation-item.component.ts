import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogCorrectiveAction, LogItem } from '../interfaces/gap-packing-master-sanitation-log.interface'

@Component({
  selector: 'gap-packing-master-sanitation-item',
  templateUrl: './gap-packing-master-sanitation-item.component.html'
})

export class GAPPackingMasterSanitationItemComponent {
  @Input() item: LogItem
  @Input() actions: Array<LogCorrectiveAction>
  @Input() itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}
