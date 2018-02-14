import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { LogArea } from '../interfaces/gmp.packing.glass.brittle.log.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-area',
  templateUrl: './gmp.packing.glass.brittle.area.html'
})

export class GMPPackingGlassBrittleAreaComponent {
  @Input() area: LogArea
  @Input('group') public areaForm: FormGroup

  constructor() {
    
  }
}