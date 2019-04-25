import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogWeek } from '../interfaces/gmp.packing.atp.luminometer.log.interface'

@Component({
  selector: 'gmp-packing-atp-luminometer-week',
  templateUrl: './gmp.packing.atp.luminometer.week.html'
})

export class GMPPackingATPLuminometerWeekComponent {
  @Input() itemID: number
  @Input() week: LogWeek
  @Input('weekGroup') weekForm: FormGroup
  @Language() lang: string
  dateConfig: any

  constructor(private langManager: LanguageService) {

  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfigShort
  }
}