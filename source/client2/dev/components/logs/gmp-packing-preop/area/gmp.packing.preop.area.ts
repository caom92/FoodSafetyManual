import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { CorrectiveAction, LogArea } from '../interfaces/gmp.packing.preop.log.interface'

@Component({
  selector: 'gmp-packing-preop-area',
  templateUrl: './gmp.packing.preop.area.html'
})

export class GMPPackingPreopAreaComponent implements OnInit {
  @Input() area: LogArea
  @Input() actions: Array<CorrectiveAction>
  @Input('group') public areaForm: FormGroup
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