import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogItem, CorrectiveAction } from '../interfaces/gap.packing.preop.log.interface'

@Component({
  selector: 'gap-packing-preop-item',
  templateUrl: './gap.packing.preop.item.html'
})

export class GAPPackingPreopItemComponent {
  @Input() item: LogItem
  @Input() actions: Array<CorrectiveAction>
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}