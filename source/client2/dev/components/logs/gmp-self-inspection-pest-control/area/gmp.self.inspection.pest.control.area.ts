import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LogArea } from '../interfaces/gmp.self.inspection.pest.control.log.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-area',
  templateUrl: './gmp.self.inspection.pest.control.area.html'
})

export class GMPSelfInspectionPestControlAreaComponent {
  @Input() area: LogArea
  @Input('group') public areaForm: FormGroup
  @Input() offset: number

  constructor() {
    
  }
}