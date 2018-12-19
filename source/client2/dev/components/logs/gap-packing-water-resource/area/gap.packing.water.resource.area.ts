import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'
import { MzMediaService } from 'ngx-materialize'
import { Observable } from 'rxjs'

import { LogArea } from '../interfaces/gap.packing.water.resource.log.interface'

@Component({
  selector: 'gap-packing-water-resource-area',
  templateUrl: './gap.packing.water.resource.area.html'
})

export class GAPPackingWaterResourceAreaComponent {
  @Input() area: LogArea
  @Input('group') public areaForm: FormGroup
  @Language() lang: string

  public lowerThanLargeResolution: Observable<boolean>

  constructor(private mediaService: MzMediaService) {
    this.lowerThanLargeResolution = this.mediaService.isActive('lt-l')
  }
}
