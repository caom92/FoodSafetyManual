import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'
import { MzMediaService } from 'ngx-materialize'
import { Observable } from 'rxjs'

import { LanguageService } from '../../../../services/app.language'
import { LogItem } from '../interfaces/gap.packing.water.resource.log.interface'

@Component({
  selector: 'gap-packing-water-resource-item',
  templateUrl: './gap.packing.water.resource.item.html'
})

export class GAPPackingWaterResourceItemComponent {
  @Input() item: LogItem
  @Input('itemGroup') public itemForm: FormGroup
  @Language() lang: string

  public lowerThanLargeResolution: Observable<boolean>

  constructor(private langManager: LanguageService, private mediaService: MzMediaService) {
    this.lowerThanLargeResolution = this.mediaService.isActive('lt-l')
  }
}
