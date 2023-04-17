import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogCorrectiveAction, LogArea } from '../interfaces/gap-packing-master-sanitation-log.interface'

@Component({
  selector: 'gap-packing-master-sanitation-area',
  templateUrl: './gap-packing-master-sanitation-area.component.html'
})

export class GAPPackingMasterSanitationAreaComponent implements OnInit {
  @Input() area: LogArea
  @Input() actions: Array<LogCorrectiveAction>
  @Input() public areaForm: FormGroup
  @Language() lang: string
  offset: Array<number> = []

  constructor(private langManager: LanguageService) {

  }

  ngOnInit() {
    let accumulated = 0
    this.offset.push(accumulated)
    for (let type of this.area.types) {
      this.offset.push(accumulated + type.items.length)
      accumulated = accumulated + type.items.length
    }
  }
}
