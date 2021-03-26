import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogMachine } from '../interfaces/gap-packing-harvest-machine-cleaning-log.interface'

@Component({
  selector: 'gap-packing-harvest-machine-cleaning-machine',
  templateUrl: './gap-packing-harvest-machine-cleaning-machine.component.html'
})

export class GAPPackingHarvestMachineCleaningMachineComponent {
  @Input() machine: LogMachine
  @Input() public machineForm: FormGroup
  @Language() lang: string

  constructor(public langManager: LanguageService) {

  }
}