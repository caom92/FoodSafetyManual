import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogItem } from '../interfaces/gmp.packing.scissors.knives.log.interface'

@Component({
  selector: 'gmp-packing-scissors-knives-item',
  templateUrl: './gmp.packing.scissors.knives.item.html'
})

export class GMPPackingScissorsKnivesItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}