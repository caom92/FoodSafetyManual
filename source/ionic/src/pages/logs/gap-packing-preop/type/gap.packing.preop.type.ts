import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CorrectiveAction, LogType } from '../interfaces/gap.packing.preop.log.interface'

@Component({
  selector: 'gap-packing-preop-type',
  templateUrl: './gap.packing.preop.type.html'
})

export class GAPPackingPreopTypeComponent {
  @Input() type: LogType
  @Input() actions: CorrectiveAction
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}