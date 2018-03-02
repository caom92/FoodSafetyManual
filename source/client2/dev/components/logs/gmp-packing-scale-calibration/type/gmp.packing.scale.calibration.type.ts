import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogType, LogUnit } from '../interfaces/gmp.packing.scale.calibration.log.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-type',
  templateUrl: './gmp.packing.scale.calibration.type.html'
})

export class GMPPackingScaleCalibrationTypeComponent {
  @Input() type: LogType
  @Input() units: Array<LogUnit>
  @Input('group') public typeForm: FormGroup
  @Language() lang: string

  constructor(private langManager: LanguageService) {

  }
}