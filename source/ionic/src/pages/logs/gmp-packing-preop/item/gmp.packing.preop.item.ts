import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogItem, CorrectiveAction } from '../interfaces/gmp.packing.preop.log.interface'

@Component({
  selector: 'gmp-packing-preop-item',
  templateUrl: './gmp.packing.preop.item.html'
})

export class GMPPackingPreopItemComponent {
  @Input() item: LogItem
  @Input() actions: CorrectiveAction
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}