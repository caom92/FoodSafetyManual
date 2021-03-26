import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { ReportMachine } from '../interfaces/gap-packing-harvest-machine-cleaning-report.interface'

@Component({
  selector: '[gap-packing-harvest-machine-cleaning-report-machine]',
  templateUrl: './gap-packing-harvest-machine-cleaning-report-machine.component.html'
})

export class GAPPackingHarvestMachineCleaningReportMachineComponent {
  @Input() machine: ReportMachine
  @Language() lang: string

  constructor() {

  }
}