import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogItem } from '../interfaces/gmp.self.inspection.pest.control.log.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-item',
  templateUrl: './gmp.self.inspection.pest.control.item.html'
})

export class GMPSelfInspectionPestControlItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}