import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogItem } from '../interfaces/gap.self.inspection.pest.control.log.interface'

@Component({
  selector: 'gap-self-inspection-pest-control-item',
  templateUrl: './gap.self.inspection.pest.control.item.html'
})

export class GAPSelfInspectionPestControlItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}