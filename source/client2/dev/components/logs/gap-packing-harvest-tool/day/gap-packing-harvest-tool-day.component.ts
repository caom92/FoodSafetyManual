import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogDay } from '../interfaces/gap-packing-harvest-tool-log.interface'

@Component({
  selector: 'gap-packing-harvest-tool-day',
  templateUrl: './gap-packing-harvest-tool-day.component.html'
})

export class GAPPackingHarvestToolDayComponent {
  @Input() day: LogDay
  @Input() dayForm: FormGroup
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}