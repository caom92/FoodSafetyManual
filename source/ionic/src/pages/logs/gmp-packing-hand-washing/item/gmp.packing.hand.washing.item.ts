import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogItem } from '../interfaces/gmp.packing.hand.washing.log.interface'

@Component({
  selector: 'gmp-packing-hand-washing-item',
  templateUrl: './gmp.packing.hand.washing.item.html'
})

export class GMPPackingHandWashingItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}