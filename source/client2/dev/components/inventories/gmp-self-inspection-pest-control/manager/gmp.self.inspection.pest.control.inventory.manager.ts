import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-manager',
  templateUrl: 'gmp.self.inspection.pest.control.inventory.manager.html'
})

export class GMPSelfInspectionPestControlInventoryManagerComponent {
  @Language() lang: string

  constructor() {

  }
}
