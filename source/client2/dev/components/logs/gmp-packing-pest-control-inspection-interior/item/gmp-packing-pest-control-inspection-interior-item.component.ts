import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogArea, LogItemAreaVerification, LogItemCorrectiveAction, LogItemEquipmentStatus, LogItemPestType, LogItemProtectionStatus, LogItemTask } from '../interfaces/gmp-packing-pest-control-inspection-interior-log.interface'

@Component({
  selector: 'gmp-packing-pest-control-inspection-interior-item',
  templateUrl: './gmp-packing-pest-control-inspection-interior-item.component.html'
})

export class GMPPackingPestControlInspectionInteriorItemComponent {
  @Input() item: LogArea
  @Input() itemForm: FormGroup
  @Input() areaVerifications: Array<LogItemAreaVerification>
  @Input() correctiveActions: Array<LogItemCorrectiveAction>
  @Input() equipmentStatuses: Array<LogItemEquipmentStatus>
  @Input() pestTypes: Array<LogItemPestType>
  @Input() protectionStatuses: Array<LogItemProtectionStatus>
  @Input() tasks: Array<LogItemTask>
  @Language() lang: string

  constructor() {

  }

  ngOnInit() {
    console.log(this.correctiveActions)
  }
}