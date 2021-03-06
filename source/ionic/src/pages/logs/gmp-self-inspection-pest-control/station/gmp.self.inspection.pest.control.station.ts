import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { FormGroup } from '@angular/forms'
import { LogStation } from '../interfaces/gmp.self.inspection.pest.control.log.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-station',
  templateUrl: './gmp.self.inspection.pest.control.station.html'
})

export class GMPSelfInspectionPestControlStationComponent {
  @Input() item: LogStation
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  constructor() {

  }
}