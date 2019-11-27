import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LogArea } from '../interfaces/gap.self.inspection.pest.control.log.interface'

@Component({
  selector: 'gap-self-inspection-pest-control-area',
  templateUrl: './gap.self.inspection.pest.control.area.html'
})

export class GAPSelfInspectionPestControlAreaComponent {
  @Input() area: LogArea
  @Input('group') public areaForm: FormGroup
  @Input() offset: number

  constructor() {
    
  }
}